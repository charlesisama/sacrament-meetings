
"use client";

import { deleteMeeting } from "@/lib/actions";

type DeleteMeetingButtonProps = {
    meetingId: number;
};

export default function DeleteMeetingButton({
    meetingId,
}: DeleteMeetingButtonProps) {
    return (
        <form action={deleteMeeting}>
            <input
                type="hidden"
                name="id"
                value={meetingId}
            />

            <button
                type="submit"
                onClick={(event) => {
                    const confirmed = window.confirm(
                        "Are you sure you want to delete this meeting? This action cannot be undone."
                    );

                    if (!confirmed) {
                        event.preventDefault();
                    }
                }}
                className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-800"
            >
                Delete Meeting
            </button>
        </form>
    );
}
