import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata = { title: "Payouts | Budgetree" };

export default function Page() {
  return (
    <main className="min-h-screen bg-base px-4 pb-24 pt-28 text-fg sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-fg/60 hover:text-fg">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <div className="mt-12 rounded-[2.5rem] bg-gradient-to-br from-volt via-[#D8FF6B] to-mint px-8 py-16 text-coal sm:px-14 sm:py-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em]">Neo Plus / Payouts</p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Business payouts, simplified.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-coal/75 sm:text-lg">
            Explore single and bulk payouts for your business with guided onboarding and clear payment tracking.
          </p>
          <Link href="/contact" className="mt-9 inline-flex items-center gap-2 rounded-full bg-coal px-7 py-4 font-bold text-white transition hover:scale-[1.02]">
            Contact our team <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <article className="rounded-3xl border border-line/10 bg-raise p-6">
            <h3 className="font-display text-xl font-bold">Single payouts</h3>
            <p className="mt-3 text-sm leading-7 text-fg/65">Manage one-off business payments.</p>
          </article>
          <article className="rounded-3xl border border-line/10 bg-raise p-6">
            <h3 className="font-display text-xl font-bold">Bulk payouts</h3>
            <p className="mt-3 text-sm leading-7 text-fg/65">Plan payments to multiple recipients.</p>
          </article>
          <article className="rounded-3xl border border-line/10 bg-raise p-6">
            <h3 className="font-display text-xl font-bold">Payment status</h3>
            <p className="mt-3 text-sm leading-7 text-fg/65">Monitor payment progress once integrations are enabled.</p>
          </article>
        </div>
        <p className="mt-8 text-sm text-fg/55">
          Note: Payout processing requires approved provider integration and backend configuration.
        </p>
      </div>
    </main>
  );
}
