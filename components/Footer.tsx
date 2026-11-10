import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-white site-footer mt-auto border-t border-slate-200 bg-slate-900 text-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <div>
                    <p className="font-semibold">
                        Sacrament Meeting Planner
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                        Helping leaders organize meaningful meetings.
                    </p>
                </div>

                <div className="text-sm text-slate-400">
                    <Link
                        href="/meetings"
                        className="transition hover:text-white"
                    >
                        View Meetings
                    </Link>

                    <p className="mt-2">
                        ©  2026 Sacrament Meeting Planner
                    </p>
                </div>
            </div>
        </footer>
    );
}