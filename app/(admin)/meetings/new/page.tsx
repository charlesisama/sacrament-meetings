
import MeetingForm from "@/components/MeetingForm";
import { createMeeting } from "@/lib/actions";

export default function NewMeetingPage() {
    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">
                    Create Meeting
                </h1>

                <p className="mt-2 text-slate-600">
                    Enter the details for the upcoming sacrament meeting.
                </p>
            </header>

            <MeetingForm action={createMeeting} />
        </div>
    );
}
