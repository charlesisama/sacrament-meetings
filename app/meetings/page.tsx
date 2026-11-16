
import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import {
    getMeetings,
    getMeetingsTotalPages,
} from "@/lib/meetings-db";

type MeetingsPageProps = {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
};

export default async function MeetingsPage({
    searchParams,
}: MeetingsPageProps) {
    const params = await searchParams;

    const query = params.query ?? "";
    const currentPage = Math.max(1, Number(params.page) || 1);

    const [meetings, totalPages] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);

    return (
        <section>
            <div className="mb-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                    Meeting Records
                </p>
                <h1 className="mb-3 text-3xl font-bold text-slate-900">
                    All Meetings
                </h1>
                <p className="text-slate-600">
                    Browse meeting agendas and review previous programs.
                </p>
            </div>

            <Suspense
                fallback={
                    <div className="mb-6 h-12 animate-pulse rounded-lg bg-gray-100" />
                }
            >
                <MeetingSearch />
            </Suspense>

            {meetings.length === 0 ? (
                <p className="rounded-xl bg-white p-6 text-slate-600">
                    {query
                        ? `No meetings found matching "${query}". Try another search.`
                        : "No meeting records are available."}
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {meetings.map((meeting) => (
                        <MeetingCard
                            key={meeting.id}
                            meeting={meeting}
                        />
                    ))}
                </div>
            )}

            <Suspense fallback={null}>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </Suspense>
        </section>
    );
}
