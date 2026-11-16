
import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(
    _request: Request,
    { params }: RouteContext
) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isSafeInteger(meetingId) || meetingId <= 0) {
        return NextResponse.json(
            { error: "Invalid meeting ID." },
            { status: 400 }
        );
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        return NextResponse.json(
            { error: "Meeting not found." },
            { status: 404 }
        );
    }

    return NextResponse.json(meeting);
}
