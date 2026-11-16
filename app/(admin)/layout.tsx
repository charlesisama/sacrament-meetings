
import Link from "next/link";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="mx-auto min-h-screen max-w-6xl px-6 py-8">
            <div className="mb-8 border-b border-slate-200 pb-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                    Administration
                </p>

                <h1 className="text-2xl font-bold text-slate-900">
                    Meeting Management
                </h1>

                <nav
                    aria-label="Administration navigation"
                    className="mt-4 flex gap-6 text-sm font-medium"
                >
                    <Link
                        href="/meetings"
                        className="text-slate-600 transition hover:text-blue-600"
                    >
                        Public Meetings
                    </Link>

                    <Link
                        href="/meetings/new"
                        className="text-slate-600 transition hover:text-blue-600"
                    >
                        Create Meeting
                    </Link>
                </nav>
            </div>

            <main>{children}</main>
        </div>
    );
}
