
import { NextResponse } from "next/server";
import { connection } from "next/server";
import {
    getMeetings,
    getMeetingsTotalPages,
} from "@/lib/meetings-db";

export async function GET() {
    await connection();

    try {
        const [page1, page2, searchResults, totalPages] =
            await Promise.all([
                getMeetings("", 1),
                getMeetings("", 2),
                getMeetings("smith", 1),
                getMeetingsTotalPages(""),
            ]);

        return NextResponse.json({
            success: true,
            tests: {
                firstPage: {
                    count: page1.length,
                    ids: page1.map((meeting) => meeting.id),
                },
                secondPage: {
                    count: page2.length,
                    ids: page2.map((meeting) => meeting.id),
                },
                searchSmith: {
                    count: searchResults.length,
                    ids: searchResults.map((meeting) => meeting.id),
                },
                totalPages,
            },
        });
    } catch (error) {
        console.error("Database test failed:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Database test failed.",
            },
            { status: 500 }
        );
    }
}
