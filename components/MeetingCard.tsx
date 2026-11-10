import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({
    meeting,
}: MeetingCardProps) {
    const formattedDate = new Date(
        `${meeting.date}T00:00:00`
    ).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const meetingTypeLabel = {
        testimony: "Testimony Meeting",
        regular: "Regular Meeting",
        stake: "Stake Meeting",
        general: "General Meeting",
    }[meeting.meetingType];

    return (
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {meetingTypeLabel}
                </span>

                <span className="text-sm text-slate-500">
                    Meeting #{meeting.id}
                </span>
            </div>

            <h2 className="mb-2 text-xl font-bold text-slate-900">
                {formattedDate}
            </h2>

            <div className="space-y-2 text-sm text-slate-600">
                <p>
                    <span className="font-semibold text-slate-800">
                        Presiding:
                    </span>{" "}
                    {meeting.presiding}
                </p>

                <p>
                    <span className="font-semibold text-slate-800">
                        Conducting:
                    </span>{" "}
                    {meeting.conducting}
                </p>

                <p>
                    <span className="font-semibold text-slate-800">
                        Speakers and musical numbers:
                    </span>{" "}
                    {meeting.speakers.length}
                </p>
            </div>

            <Link
                href={`/meetings/${meeting.id}`}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800"
            >
                View Meeting Details
                <span aria-hidden="true">→</span>
            </Link>
        </article>
    );
}