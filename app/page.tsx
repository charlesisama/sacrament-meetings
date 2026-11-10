
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="rounded-2xl bg-gradient-to-br from-blue-900 to-blue-600 px-8 py-16 text-white shadow-lg sm:px-14">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-200">
          Riverside Ward
        </p>

        <h1 className="mb-6 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          Sacrament Meeting Planner
        </h1>

        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-blue-100">
          A simple platform for organizing meeting agendas,
          reviewing upcoming programs and accessing past
          sacrament meeting records.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/meetings"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-800 transition hover:bg-blue-50"
          >
            Explore Meetings
          </Link>

          <Link
            href="/meetings/current"
            className="rounded-lg border border-white/50 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Current Meeting
          </Link>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-slate-900">
            Meeting Agendas
          </h2>

          <p className="text-sm leading-relaxed text-slate-600">
            Review announcements, hymns, prayers, ward business
            and speakers.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-slate-900">
            Meeting History
          </h2>

          <p className="text-sm leading-relaxed text-slate-600">
            Browse current and previous meeting programs
            whenever you need them.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-slate-900">
            Printable Programs
          </h2>

          <p className="text-sm leading-relaxed text-slate-600">
            Access clean meeting programs that can be printed
            or saved as PDF.
          </p>
        </article>
      </section>
    </div>
  );
}
