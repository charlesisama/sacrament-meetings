
import Link from "next/link";

export default function EditMeetingNotFound() {
    return (
        <section className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                404 — Meeting Not Found
            </p>

            <h2 className="mb-3 text-2xl font-bold text-slate-900">
                Meeting Not Found
            </h2>

            <p className="mb-6 text-slate-600">
                The meeting you are trying to edit does not exist or may
                have been deleted.
            </p>

            <Link
                href="/meetings"
                className="inline-flex rounded-md bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
                Return to Meetings
            </Link>
        </section>
    );
}
