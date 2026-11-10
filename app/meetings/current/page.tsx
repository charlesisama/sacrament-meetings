
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getCurrentMeeting } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
    // Wait for an incoming request before using the current date.
    await connection();

    const meeting = getCurrentMeeting();

    if (!meeting) {
        return (
            <div className="rounded-xl bg-white p-8 text-center">
                <h1 className="mb-3 text-2xl font-bold text-slate-900">
                    No Current Meeting
                </h1>

                <p className="text-slate-600">
                    No meeting is scheduled for the current Sunday.
                </p>
            </div>
        );
    }

    redirect(`/meetings/${meeting.id}`);
}
