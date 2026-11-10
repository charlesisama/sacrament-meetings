
/**
 * Defines the different types of sacrament meetings.
 */
export type MeetingType =
    | "testimony"
    | "regular"
    | "stake"
    | "general";

/**
 * Represents a hymn used during a meeting.
 */
export interface Hymn {
    number: number;
    title: string;
}

/**
 * Represents either a speaker or a musical number.
 */
export interface SpeakerItem {
    name: string;
    topic: string;
    type: "speaker" | "musical-number";
}

/**
 * Represents an item of ward business.
 */
export interface WardBusinessItem {
    description: string;
}

/**
 * Represents a complete sacrament meeting record.
 */
export interface SacramentMeeting {
    id: number;
    date: string;
    meetingType: MeetingType;
    presiding: string;
    conducting: string;
    announcements?: string[];
    openingHymn: Hymn;
    openingPrayer: string;
    wardBusiness: WardBusinessItem[];
    stakeBusiness: boolean;
    sacramentHymn: Hymn;
    speakers: SpeakerItem[];
    closingHymn: Hymn;
    closingPrayer: string;
}
