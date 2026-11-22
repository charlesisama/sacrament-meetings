
import { z } from "zod";

const speakerLineSchema = z.string().superRefine((line, ctx) => {
    const parts = line.split("|").map((part) => part.trim());

    if (
        parts.length !== 3 ||
        !parts[0] ||
        !parts[1] ||
        !["speaker", "musical-number"].includes(parts[2])
    ) {
        ctx.addIssue({
            code: "custom",
            message:
                "Use the format: Name | Topic | speaker or musical-number.",
        });
    }
});

export const MeetingFormSchema = z
    .object({
        date: z.string().min(1, "Please select a meeting date."),
        meetingType: z.enum([
            "testimony",
            "regular",
            "stake",
            "general",
            "special",
        ]),
        presiding: z.string().trim().min(1, "Presiding officer is required."),
        conducting: z.string().trim().min(1, "Conducting officer is required."),

        announcements: z.string().optional().default(""),

        openingHymnNumber: z.coerce
            .number()
            .int()
            .positive("Enter a valid opening hymn number."),
        openingHymnTitle: z.string().trim().min(1, "Opening hymn title is required."),
        openingPrayer: z.string().trim().min(1, "Opening prayer is required."),

        wardBusiness: z.string().optional().default(""),
        stakeBusiness: z.enum(["true", "false"]),

        sacramentHymnNumber: z.coerce
            .number()
            .int()
            .positive("Enter a valid sacrament hymn number."),
        sacramentHymnTitle: z.string().trim().min(1, "Sacrament hymn title is required."),

        speakers: z.string().optional().default(""),

        closingHymnNumber: z.coerce
            .number()
            .int()
            .positive("Enter a valid closing hymn number."),
        closingHymnTitle: z.string().trim().min(1, "Closing hymn title is required."),
        closingPrayer: z.string().trim().min(1, "Closing prayer is required."),
    })
    .superRefine((data, ctx) => {
        const speakerLines = data.speakers
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

        speakerLines.forEach((line, index) => {
            const result = speakerLineSchema.safeParse(line);

            if (!result.success) {
                ctx.addIssue({
                    code: "custom",
                    path: ["speakers"],
                    message: `Line ${index + 1}: ${result.error.issues[0].message}`,
                });
            }
        });
    })
    .transform((data) => ({
        date: data.date,
        meetingType: data.meetingType,
        presiding: data.presiding,
        conducting: data.conducting,

        announcements: data.announcements
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),

        openingHymn: {
            number: data.openingHymnNumber,
            title: data.openingHymnTitle,
        },
        openingPrayer: data.openingPrayer,

        wardBusiness: data.wardBusiness
            .split("\n")
            .map((description) => description.trim())
            .filter(Boolean)
            .map((description) => ({ description })),

        stakeBusiness: data.stakeBusiness === "true",

        sacramentHymn: {
            number: data.sacramentHymnNumber,
            title: data.sacramentHymnTitle,
        },

        speakers: data.speakers
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
                const [name, topic, type] = line.split("|").map((part) => part.trim());

                return {
                    name,
                    topic,
                    type: type as "speaker" | "musical-number",
                };
            }),

        closingHymn: {
            number: data.closingHymnNumber,
            title: data.closingHymnTitle,
        },
        closingPrayer: data.closingPrayer,
    }));

export type MeetingFormData = z.infer<typeof MeetingFormSchema>;

export type MeetingFormState = {
    message?: string;
    errors?: Record<string, string[]>;
};
