export const instant = false;

import MeetingForm from "@/components/MeetingForm";
import { updateMeeting } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";

type EditMeetingPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditMeetingPage({
    params,
}: EditMeetingPageProps) {
    const { id } = await params;

    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    const updateMeetingAction = updateMeeting.bind(
        null,
        meetingId
    );

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">
                    Edit Meeting
                </h1>

                <p className="mt-2 text-slate-600">
                    Update the details of this sacrament meeting.
                </p>
            </header>

            <MeetingForm
                action={updateMeetingAction}
                initialData={meeting}
            />
        </div>
    );
}
