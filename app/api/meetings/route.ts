
import { NextResponse } from "next/server";
import {
    getAllMeetings,
    getMeetingsByType,
} from "@/lib/meetings-db";
import type { MeetingType } from "@/lib/types";

const validMeetingTypes: MeetingType[] = [
    "testimony",
    "regular",
    "stake",
    "general",
];

export function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    // No type filter: return every meeting.
    if (type === null) {
        return NextResponse.json(getAllMeetings());
    }

    // Reject unsupported meeting types.
    if (!validMeetingTypes.includes(type as MeetingType)) {
        return NextResponse.json(
            {
                error: "Invalid meeting type.",
                validTypes: validMeetingTypes,
            },
            { status: 400 }
        );
    }

    // Return meetings matching the requested type.
    const meetings = getMeetingsByType(type as MeetingType);

    return NextResponse.json(meetings);
}
