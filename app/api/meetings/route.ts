
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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type === null) {
        const meetings = await getAllMeetings();
        return NextResponse.json(meetings);
    }

    if (!validMeetingTypes.includes(type as MeetingType)) {
        return NextResponse.json(
            {
                error: "Invalid meeting type.",
                validTypes: validMeetingTypes,
            },
            { status: 400 }
        );
    }

    const meetings = await getMeetingsByType(type as MeetingType);

    return NextResponse.json(meetings);
}
