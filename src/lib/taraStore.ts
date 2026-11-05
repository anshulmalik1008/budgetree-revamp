import "server-only";

type RedisValue = string | number;
type RedisCommand = RedisValue[];
type RedisHash = Record<string, string>;
const url = () => (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "").replace(/\/$/, "");
const token = () => process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "";

export function storageConfigured() { return Boolean(url() && token()); }

export async function redisBatch(commands: RedisCommand[]) {
  if (!storageConfigured()) return null;
  const res = await fetch(url() + "/pipeline", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commands),
    signal: AbortSignal.timeout(7000),
    cache: "no-store"
  });
  const rows: unknown = await res.json();
  if (!res.ok || !Array.isArray(rows)) throw new Error("Redis unavailable");
  return rows.map((entry: { result?: unknown; error?: string }) => {
    if (entry.error) throw new Error("Redis command failed");
    return entry.result ?? null;
  });
}
export function redisHash(raw: unknown): RedisHash {
  if (!Array.isArray(raw)) return {};
  const result: RedisHash = {};
  for (let i = 0; i + 1 < raw.length; i += 2) {
    if (typeof raw[i] === "string") result[raw[i]] = String(raw[i + 1] ?? "");
  }
  return result;
}
export async function getLeads(max = 100) {
  if (!storageConfigured()) return [];
  const ids = (await redisBatch([["ZREVRANGE", "bt:leads", "0", String(Math.min(max, 200) - 1)]]))?.[0];
  if (!Array.isArray(ids) || !ids.length) return [];
  const data = await redisBatch(ids.filter((id): id is string => typeof id === "string")
    .map((id) => ["HGETALL", "bt:lead:" + id]));
  return (data || []).map(redisHash).filter((row) => Boolean(row.id));
}
export async function getConversations(max = 40) {
  if (!storageConfigured()) return [];
  const ids = (await redisBatch([["ZREVRANGE", "bt:convs", "0", String(Math.min(max, 100) - 1)]]))?.[0];
  if (!Array.isArray(ids) || !ids.length) return [];
  const data = await redisBatch(ids.filter((id): id is string => typeof id === "string")
    .map((id) => ["HGETALL", "bt:conv:" + id]));
  return (data || []).map(redisHash).filter((row) => Boolean(row.id));
}

const validSession = /^[a-zA-Z0-9_-]{8,64}$/;
export async function saveChat(sid: string, question: string, answer: string, page: string) {
  if (!storageConfigured() || process.env.LOG_CHATS !== "true" || !validSession.test(sid)) return;
  const now = Date.now();
  const expire = Math.max(1, Number(process.env.CHAT_RETENTION_DAYS) || 30) * 86400;
  try {
    await redisBatch([
      ["RPUSH", "bt:conv:" + sid + ":m", JSON.stringify({ r: "user", c: question.slice(0, 1500), t: now }),
        JSON.stringify({ r: "assistant", c: answer.slice(0, 4300), t: now })],
      ["HSET", "bt:conv:" + sid, "id", sid, "updatedAt", String(now), "page", page.slice(0, 200), "lastQuestion", question.slice(0, 120)],
      ["ZADD", "bt:convs", String(now), sid],
      ["EXPIRE", "bt:conv:" + sid, String(expire)],
      ["EXPIRE", "bt:conv:" + sid + ":m", String(expire)]
    ]);
  } catch { /* Chat still works if optional Redis logging fails. */ }
}
