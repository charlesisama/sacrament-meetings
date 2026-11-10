
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

interface MeetingPageProps {
    params: Promise<{ id: string }>;
}

// This component handles the asynchronous route parameter.
async function MeetingPageContent({ params }: MeetingPageProps) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isSafeInteger(meetingId) || meetingId <= 0) {
        notFound();
    }

    const meeting = getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    return (
        <div>
            <div className="mb-6">
                <Link
                    href="/meetings"
                    className="font-medium text-blue-600 hover:underline"
                >
                    ← Back to All Meetings
                </Link>
            </div>

            <MeetingDetail meeting={meeting} />
        </div>
    );
}

// The Suspense boundary handles the asynchronous route data.
export default function MeetingPage({ params }: MeetingPageProps) {
    return (
        <Suspense
            fallback={
                <div className="py-12 text-center text-slate-600">
                    Loading meeting details...
                </div>
            }
        >
            <MeetingPageContent params={params} />
        </Suspense>
    );
}
