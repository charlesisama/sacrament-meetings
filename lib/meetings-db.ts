
import { sql } from "@/lib/db";
import type {
    SacramentMeeting,
    Hymn,
    SpeakerItem,
    WardBusinessItem,
} from "./types";

type MeetingRow = {
    id: number;
    date: string;
    meeting_type: SacramentMeeting["meetingType"];
    presiding: string;
    conducting: string;
    announcements: string[] | null;
    opening_hymn: Hymn;
    opening_prayer: string;
    ward_business: WardBusinessItem[];
    stake_business: boolean;
    sacrament_hymn: Hymn;
    speakers: SpeakerItem[];
    closing_hymn: Hymn;
    closing_prayer: string;
};

/**
 * Converts a PostgreSQL row into our TypeScript meeting model.
 */
function mapMeeting(row: MeetingRow): SacramentMeeting {
    return {
        id: row.id,
        date: row.date,
        meetingType: row.meeting_type,
        presiding: row.presiding,
        conducting: row.conducting,
        announcements: row.announcements ?? undefined,
        openingHymn: row.opening_hymn,
        openingPrayer: row.opening_prayer,
        wardBusiness: row.ward_business,
        stakeBusiness: row.stake_business,
        sacramentHymn: row.sacrament_hymn,
        speakers: row.speakers,
        closingHymn: row.closing_hymn,
        closingPrayer: row.closing_prayer,
    };
}

/**
 * Retrieves all sacrament meeting records.
 */
export async function getAllMeetings(): Promise<SacramentMeeting[]> {
    const rows = await sql`
        SELECT
            id,
            date::text AS date,
            meeting_type,
            presiding,
            conducting,
            announcements,
            opening_hymn,
            opening_prayer,
            ward_business,
            stake_business,
            sacrament_hymn,
            speakers,
            closing_hymn,
            closing_prayer
        FROM meetings
        ORDER BY date DESC, id DESC
    `;

    return (rows as MeetingRow[]).map(mapMeeting);
}

/**
 * Retrieves a meeting using its unique ID.
 */
export async function getMeetingById(
    id: number
): Promise<SacramentMeeting | undefined> {
    const rows = await sql`
        SELECT
            id,
            date::text AS date,
            meeting_type,
            presiding,
            conducting,
            announcements,
            opening_hymn,
            opening_prayer,
            ward_business,
            stake_business,
            sacrament_hymn,
            speakers,
            closing_hymn,
            closing_prayer
        FROM meetings
        WHERE id = ${id}
        LIMIT 1
    `;

    const row = (rows as MeetingRow[])[0];

    return row ? mapMeeting(row) : undefined;
}

/**
 * Retrieves meetings belonging to a specific meeting type.
 */
export async function getMeetingsByType(
    meetingType: SacramentMeeting["meetingType"]
): Promise<SacramentMeeting[]> {
    const rows = await sql`
        SELECT
            id,
            date::text AS date,
            meeting_type,
            presiding,
            conducting,
            announcements,
            opening_hymn,
            opening_prayer,
            ward_business,
            stake_business,
            sacrament_hymn,
            speakers,
            closing_hymn,
            closing_prayer
        FROM meetings
        WHERE meeting_type = ${meetingType}
        ORDER BY date DESC, id DESC
    `;

    return (rows as MeetingRow[]).map(mapMeeting);
}

/**
 * Retrieves the meeting scheduled for the current Sunday.
 */
export async function getCurrentMeeting(): Promise<
    SacramentMeeting | undefined
> {
    const today = new Date();

    const sunday = new Date(today);
    sunday.setHours(0, 0, 0, 0);
    sunday.setDate(sunday.getDate() + (7 - sunday.getDay()) % 7);

    const targetDate = [
        sunday.getFullYear(),
        String(sunday.getMonth() + 1).padStart(2, "0"),
        String(sunday.getDate()).padStart(2, "0"),
    ].join("-");

    const rows = await sql`
        SELECT
            id,
            date::text AS date,
            meeting_type,
            presiding,
            conducting,
            announcements,
            opening_hymn,
            opening_prayer,
            ward_business,
            stake_business,
            sacrament_hymn,
            speakers,
            closing_hymn,
            closing_prayer
        FROM meetings
        WHERE date = ${targetDate}::date
        LIMIT 1
    `;

    const row = (rows as MeetingRow[])[0];

    return row ? mapMeeting(row) : undefined;
}
