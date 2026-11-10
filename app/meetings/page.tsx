
import MeetingCard from "@/components/MeetingCard";
import { getAllMeetings } from "@/lib/meetings-db";

export default function MeetingsPage() {
    const meetings = getAllMeetings();

    const sortedMeetings = [...meetings].sort((a, b) =>
        b.date.localeCompare(a.date)
    );

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

            {sortedMeetings.length === 0 ? (
                <p className="rounded-xl bg-white p-6 text-slate-600">
                    No meeting records are available.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {sortedMeetings.map((meeting) => (
                        <MeetingCard
                            key={meeting.id}
                            meeting={meeting}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
