
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

const MEETINGS_PER_PAGE = 5;

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


export async function getMeetings(
    query = "",
    currentPage = 1
): Promise<SacramentMeeting[]> {
    const searchQuery = query.trim();
    const page = Math.max(1, Math.floor(currentPage) || 1);
    const offset = (page - 1) * MEETINGS_PER_PAGE;

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
        WHERE
            ${searchQuery} = ''
            OR presiding ILIKE ${'%' + searchQuery + '%'}
            OR conducting ILIKE ${'%' + searchQuery + '%'}
            OR meeting_type ILIKE ${'%' + searchQuery + '%'}
            OR speakers::text ILIKE ${'%' + searchQuery + '%'}
        ORDER BY date DESC, id DESC
        LIMIT ${MEETINGS_PER_PAGE}
        OFFSET ${offset}
    `;

    return (rows as MeetingRow[]).map(mapMeeting);
}


export async function getMeetingsTotalPages(
    query = ""
): Promise<number> {
    const searchQuery = query.trim();

    const rows = await sql`
        SELECT COUNT(*)::int AS total
        FROM meetings
        WHERE
            ${searchQuery} = ''
            OR presiding ILIKE ${'%' + searchQuery + '%'}
            OR conducting ILIKE ${'%' + searchQuery + '%'}
            OR meeting_type ILIKE ${'%' + searchQuery + '%'}
            OR speakers::text ILIKE ${'%' + searchQuery + '%'}
    `;

    const total = (rows as { total: number }[])[0]?.total ?? 0;

    return Math.ceil(total / MEETINGS_PER_PAGE);
}

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



export async function getMeetingsByDate(
    date: string
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
        WHERE date = ${date}
        ORDER BY date DESC, id DESC
    `;

    return (rows as MeetingRow[]).map(mapMeeting);
}



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



export async function addMeeting(
    data: Omit<SacramentMeeting, "id">
): Promise<void> {
    await sql`
        INSERT INTO meetings (
            date,
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
        )
        VALUES (
            ${data.date}::date,
            ${data.meetingType},
            ${data.presiding},
            ${data.conducting},
            string_to_array(NULLIF(${data.announcements?.join("\n") ?? ""}, ''), chr(10)),
            ${JSON.stringify(data.openingHymn)}::jsonb,
            ${data.openingPrayer},
            ${JSON.stringify(data.wardBusiness)}::jsonb,
            ${data.stakeBusiness},
            ${JSON.stringify(data.sacramentHymn)}::jsonb,
            ${JSON.stringify(data.speakers)}::jsonb,
            ${JSON.stringify(data.closingHymn)}::jsonb,
            ${data.closingPrayer}
        )
    `;
}


export async function updateMeeting(
    id: number,
    updates: Omit<SacramentMeeting, "id">
): Promise<void> {
    await sql`
        UPDATE meetings
        SET
            date = ${updates.date}::date,
            meeting_type = ${updates.meetingType},
            presiding = ${updates.presiding},
            conducting = ${updates.conducting},
            announcements = string_to_array(
                NULLIF(${updates.announcements?.join("\n") ?? ""}, ''),
                chr(10)
            ),
            opening_hymn = ${JSON.stringify(updates.openingHymn)}::jsonb,
            opening_prayer = ${updates.openingPrayer},
            ward_business = ${JSON.stringify(updates.wardBusiness)}::jsonb,
            stake_business = ${updates.stakeBusiness},
            sacrament_hymn = ${JSON.stringify(updates.sacramentHymn)}::jsonb,
            speakers = ${JSON.stringify(updates.speakers)}::jsonb,
            closing_hymn = ${JSON.stringify(updates.closingHymn)}::jsonb,
            closing_prayer = ${updates.closingPrayer}
        WHERE id = ${id}
    `;
}

export async function deleteMeeting(id: number): Promise<void> {
    await sql`
        DELETE FROM meetings
        WHERE id = ${id}
    `;
}
