
import type { SacramentMeeting } from './types';

/**
 * Temporary in-memory sacrament meeting database.
 */
const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: "2026-11-01",
        meetingType: "testimony",
        presiding: "Bishop James Anderson",
        conducting: "Brother Michael Brown",
        announcements: [
            "Ward temple trip scheduled for November 14.",
            "Youth activity holds on Friday at 5 PM."
        ],
        openingHymn: {
            number: 2,
            title: "The Spirit of God"
        },
        openingPrayer: "Brother David Johnson",
        wardBusiness: [
            {
                description: "Sustaining of new ward Sunday School teachers."
            }
        ],
        stakeBusiness: false,
        sacramentHymn: {
            number: 169,
            title: "As Now We Take the Sacrament"
        },
        speakers: [
            {
                name: "Sister Mary Williams",
                topic: "Personal Testimony of Jesus Christ",
                type: "speaker"
            },
            {
                name: "Brother Daniel Smith",
                topic: "Faith in the Savior",
                type: "speaker"
            }
        ],
        closingHymn: {
            number: 301,
            title: "I Am a Child of God"
        },
        closingPrayer: "Brother Peter Wilson"
    },
    {
        id: 2,
        date: "2026-11-08",
        meetingType: "regular",
        presiding: "Bishop James Anderson",
        conducting: "Brother Michael Brown",
        announcements: [
            "Stake conference preparation meeting next Sunday."
        ],
        openingHymn: {
            number: 19,
            title: "We Thank Thee, O God, for a Prophet"
        },
        openingPrayer: "Brother Samuel Davis",
        wardBusiness: [
            {
                description: "Presentation of the ward missionary report."
            }
        ],
        stakeBusiness: true,
        sacramentHymn: {
            number: 181,
            title: "Jesus of Nazareth, Savior and King"
        },
        speakers: [
            {
                name: "Sister Grace Taylor",
                topic: "The Importance of Family Prayer",
                type: "speaker"
            },
            {
                name: "Brother John Clark",
                topic: "Strengthening Our Faith",
                type: "speaker"
            }
        ],
        closingHymn: {
            number: 85,
            title: "How Firm a Foundation"
        },
        closingPrayer: "Brother Andrew Thomas"
    },
    {
        id: 3,
        date: "2026-11-15",
        meetingType: "stake",
        presiding: "President Robert Miller",
        conducting: "President Daniel White",
        announcements: [
            "Stake leadership meeting at 2 PM."
        ],
        openingHymn: {
            number: 27,
            title: "Praise to the Lord, the Almighty"
        },
        openingPrayer: "Elder Joseph Harris",
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: {
            number: 174,
            title: "While of These Emblems We Partake"
        },
        speakers: [
            {
                name: "President Robert Miller",
                topic: "Building Stronger Wards",
                type: "speaker"
            }
        ],
        closingHymn: {
            number: 85,
            title: "How Firm a Foundation"
        },
        closingPrayer: "Sister Elizabeth Moore"
    },
    {
        id: 4,
        date: "2026-11-22",
        meetingType: "regular",
        presiding: "Bishop James Anderson",
        conducting: "Brother Michael Brown",
        announcements: [
            "Thanksgiving service preparations."
        ],
        openingHymn: {
            number: 3,
            title: "Now Let Us Rejoice"
        },
        openingPrayer: "Brother Matthew Lewis",
        wardBusiness: [
            {
                description: "Ward welfare and service updates."
            }
        ],
        stakeBusiness: false,
        sacramentHymn: {
            number: 188,
            title: "Thy Will, O Lord, Be Done"
        },
        speakers: [
            {
                name: "Sister Anna Robinson",
                topic: "Gratitude in All Things",
                type: "speaker"
            },
            {
                name: "Brother Daniel Smith",
                topic: "Serving One Another",
                type: "speaker"
            }
        ],
        closingHymn: {
            number: 100,
            title: "Nearer, My God, to Thee"
        },
        closingPrayer: "Brother David Johnson"
    },
    {
        id: 5,
        date: "2026-11-29",
        meetingType: "general",
        presiding: "President Robert Miller",
        conducting: "President Daniel White",
        announcements: [
            "Special leadership training follows the meeting."
        ],
        openingHymn: {
            number: 87,
            title: "God Is Love"
        },
        openingPrayer: "Elder Joseph Harris",
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: {
            number: 193,
            title: "I Stand All Amazed"
        },
        speakers: [
            {
                name: "Sister Grace Taylor",
                topic: "Following the Example of Jesus Christ",
                type: "speaker"
            },
            {
                name: "Choir",
                topic: "Come, Follow Me",
                type: "musical-number"
            }
        ],
        closingHymn: {
            number: 98,
            title: "I Need Thee Every Hour"
        },
        closingPrayer: "Brother Peter Wilson"
    }
];

/**
 * Retrieves all sacrament meeting records.
 */
export function getAllMeetings(): SacramentMeeting[] {
    return meetings;
}

/**
 * Retrieves a meeting using its unique ID.
 */
export function getMeetingById(id: number): SacramentMeeting | undefined {
    return meetings.find((meeting) => meeting.id === id);
}

/**
 * Retrieves meetings belonging to a specific meeting type.
 */
export function getMeetingsByType(
    meetingType: SacramentMeeting["meetingType"]
): SacramentMeeting[] {
    return meetings.filter(
        (meeting) => meeting.meetingType === meetingType
    );
}

/**
 * Retrieves the most recent meeting dated today or earlier.
 */
export function getCurrentMeeting(): SacramentMeeting | undefined {
    const today = new Date().toISOString().split("T")[0];

    return meetings
        .filter((meeting) => meeting.date <= today)
        .sort((a, b) => b.date.localeCompare(a.date))[0];
}
