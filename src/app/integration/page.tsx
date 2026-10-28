import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata = { title: "Integration | Budgetree" };

export default function Page() {
  return (
    <main className="min-h-screen bg-base px-4 pb-24 pt-28 text-fg sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-fg/60 hover:text-fg"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
        <div className="mt-12 rounded-[2.5rem] bg-gradient-to-br from-volt via-[#D8FF6B] to-mint px-8 py-16 text-coal sm:px-14 sm:py-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em]">Developers / Integration</p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-6xl">From sandbox to production.</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-coal/75 sm:text-lg">A step-by-step overview of a typical integration workflow.</p>
          <Link href="/contact" className="mt-9 inline-flex items-center gap-2 rounded-full bg-coal px-7 py-4 font-bold text-white transition hover:scale-[1.02]">Contact our team <ArrowUpRight className="h-5 w-5" /></Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
        <article className="rounded-3xl border border-line/10 bg-raise p-6"><h3 className="font-display text-xl font-bold">1. Request access</h3><p className="mt-3 text-sm leading-7 text-fg/65">Contact the Budgetree team for approved integration access.</p></article>
        <article className="rounded-3xl border border-line/10 bg-raise p-6"><h3 className="font-display text-xl font-bold">2. Integrate</h3><p className="mt-3 text-sm leading-7 text-fg/65">Connect from a secure backend environment.</p></article>
        <article className="rounded-3xl border border-line/10 bg-raise p-6"><h3 className="font-display text-xl font-bold">3. Test and launch</h3><p className="mt-3 text-sm leading-7 text-fg/65">Verify flows before going live.</p></article>
        </div>
        <p className="mt-8 text-sm text-fg/55">Documentation is an overview; actual API credentials, endpoints and specifications must be provided by Budgetree.</p>
      </div>
    </main>
  );
}
