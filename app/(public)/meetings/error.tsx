
"use client";

import Link from "next/link";

type ErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function PublicMeetingsError({
    error,
    reset,
}: ErrorPageProps) {
    return (
        <section
            className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-white p-8 text-center"
            role="alert"
        >
            <h2 className="mb-3 text-2xl font-bold text-slate-900">
                Unable to Load Meetings
            </h2>

            <p className="mb-6 text-slate-600">
                Something went wrong while loading the meetings.
                Please try again.
            </p>

            {error.digest && (
                <p className="mb-4 text-xs text-slate-400">
                    Error reference: {error.digest}
                </p>
            )}

            <div className="flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => reset()}
                    className="rounded-md bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
                >
                    Try Again
                </button>

                <Link
                    href="/"
                    className="rounded-md border border-slate-300 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                    Return Home
                </Link>
            </div>
        </section>
    );
}
