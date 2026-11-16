
import { NextResponse } from "next/server";
import {
    getAllMeetings,
    getMeetingsByType,
    getMeetingsByDate,
} from "@/lib/meetings-db";
import type { MeetingType } from "@/lib/types";

const validMeetingTypes: MeetingType[] = [
    "testimony",
    "regular",
    "stake",
    "general",
    "special",
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type");
    const date = searchParams.get("date");

    // Filter meetings by date.
    if (date !== null) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return NextResponse.json(
                { error: "Invalid date format. Use YYYY-MM-DD." },
                { status: 400 }
            );
        }

        const meetings = await getMeetingsByDate(date);
        return NextResponse.json(meetings);
    }

    // Filter meetings by meeting type.
    if (type !== null) {
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

    // Return all meetings when no filter is provided.
    const meetings = await getAllMeetings();
    return NextResponse.json(meetings);
}
