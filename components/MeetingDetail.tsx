"use client";

import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
    meeting: SacramentMeeting;
}

export default function MeetingDetail({
    meeting,
}: MeetingDetailProps) {
    const formattedDate = new Date(
        `${meeting.date}T00:00:00`
    ).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const isSacramentMeeting =
        meeting.meetingType === "regular" ||
        meeting.meetingType === "testimony";

    return (
        <article className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            {/* Meeting heading */}
            <header className="mb-8 border-b border-slate-200 pb-6 text-center">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                    Riverside Ward
                </p>

                <h1 className="mb-2 text-3xl font-bold text-slate-900">
                    {meeting.meetingType === "stake"
                        ? "Stake Meeting"
                        : meeting.meetingType === "general"
                            ? "General Meeting"
                            : "Sacrament Meeting"}
                </h1>

                <p className="text-slate-600">
                    {formattedDate}
                </p>

                <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                    <p>
                        <span className="font-semibold">Presiding:</span>{" "}
                        {meeting.presiding}
                    </p>

                    <p>
                        <span className="font-semibold">Conducting:</span>{" "}
                        {meeting.conducting}
                    </p>
                </div>
            </header>

            {/* Announcements */}
            {meeting.announcements &&
                meeting.announcements.length > 0 && (
                    <section className="mb-8">
                        <h2 className="mb-3 text-lg font-bold text-slate-900">
                            Announcements
                        </h2>

                        <ul className="list-disc space-y-2 pl-6 text-slate-600">
                            {meeting.announcements.map(
                                (announcement, index) => (
                                    <li key={index}>{announcement}</li>
                                )
                            )}
                        </ul>
                    </section>
                )}

            {/* Opening hymn */}
            <section className="mb-6 rounded-lg bg-slate-50 p-4">
                <h2 className="mb-2 font-bold text-slate-900">
                    Opening Hymn
                </h2>

                <p className="text-slate-600">
                    Hymn #{meeting.openingHymn.number}:{" "}
                    {meeting.openingHymn.title}
                </p>
            </section>

            {/* Opening prayer */}
            <section className="mb-6">
                <h2 className="mb-2 font-bold text-slate-900">
                    Opening Prayer
                </h2>

                <p className="text-slate-600">
                    {meeting.openingPrayer}
                </p>
            </section>

            {/* Ward business */}
            <section className="mb-8">
                <h2 className="mb-3 text-lg font-bold text-slate-900">
                    Ward Business
                </h2>

                {meeting.wardBusiness.length > 0 ? (
                    <ul className="list-disc space-y-2 pl-6 text-slate-600">
                        {meeting.wardBusiness.map((item, index) => (
                            <li key={index}>{item.description}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-slate-500">
                        No ward business scheduled.
                    </p>
                )}

                <p className="mt-4 text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">
                        Stake Business:
                    </span>{" "}
                    {meeting.stakeBusiness ? "Yes" : "No"}
                </p>
            </section>

            {/* Sacrament hymn */}
            {isSacramentMeeting && (
                <section className="mb-8 rounded-lg bg-blue-50 p-4">
                    <h2 className="mb-2 font-bold text-slate-900">
                        Sacrament Hymn
                    </h2>

                    <p className="text-slate-700">
                        Hymn #{meeting.sacramentHymn.number}:{" "}
                        {meeting.sacramentHymn.title}
                    </p>
                </section>
            )}

            {/* Speakers and musical numbers */}
            <section className="mb-8">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                    Speakers and Musical Numbers
                </h2>

                <div className="space-y-4">
                    {meeting.speakers.map((item, index) => (
                        <div
                            key={`${item.name}-${index}`}
                            className="border-l-4 border-blue-500 pl-4"
                        >
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                                {item.type === "speaker"
                                    ? "Speaker"
                                    : "Musical Number"}
                            </p>

                            <p className="font-semibold text-slate-900">
                                {item.name}
                            </p>

                            <p className="text-sm text-slate-600">
                                {item.topic}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Closing hymn */}
            <section className="mb-6 rounded-lg bg-slate-50 p-4">
                <h2 className="mb-2 font-bold text-slate-900">
                    Closing Hymn
                </h2>

                <p className="text-slate-600">
                    Hymn #{meeting.closingHymn.number}:{" "}
                    {meeting.closingHymn.title}
                </p>
            </section>

            {/* Closing prayer */}
            <section className="mb-8">
                <h2 className="mb-2 font-bold text-slate-900">
                    Closing Prayer
                </h2>

                <p className="text-slate-600">
                    {meeting.closingPrayer}
                </p>
            </section>

            {/* Print button */}
            <div className="meeting-print-button border-t border-slate-200 pt-6 text-center">
                <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Print Meeting Program
                </button>
            </div>
        </article>
    );
}