
import { NextResponse } from "next/server";
import { connection } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
    await connection();

    try {
        const result = await sql`
            SELECT
                NOW() AS current_time,
                current_database() AS database_name
        `;

        return NextResponse.json({
            success: true,
            message: "Neon PostgreSQL connection successful!",
            data: result[0],
        });
    } catch (error) {
        console.error("Database connection failed:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Database connection failed.",
            },
            { status: 500 }
        );
    }
}
