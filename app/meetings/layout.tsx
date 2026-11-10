
import Link from "next/link";

export default function MeetingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-8">
            <nav className="mb-8 flex flex-wrap gap-3 border-b border-slate-200 pb-5">
                <Link
                    href="/meetings"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                >
                    All Meetings
                </Link>

                <Link
                    href="/meetings/current"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                >
                    Current Meeting
                </Link>
            </nav>

            {children}
        </div>
    );
}
