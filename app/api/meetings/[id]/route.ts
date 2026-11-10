
import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(
    _request: Request,
    { params }: RouteContext
) {
    // Extract the ID from the dynamic route.
    const { id } = await params;

    const meetingId = Number(id);

    // Validate the ID.
    if (!Number.isSafeInteger(meetingId) || meetingId <= 0) {
        return NextResponse.json(
            { error: "Invalid meeting ID." },
            { status: 400 }
        );
    }

    // Find the requested meeting.
    const meeting = getMeetingById(meetingId);

    // Handle a meeting that does not exist.
    if (!meeting) {
        return NextResponse.json(
            { error: "Meeting not found." },
            { status: 404 }
        );
    }

    // Return the requested meeting.
    return NextResponse.json(meeting);
}
