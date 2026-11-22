
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
    addMeeting as addMeetingToDatabase,
    updateMeeting as updateMeetingInDatabase,
    deleteMeeting as deleteMeetingFromDatabase,
} from "@/lib/meetings-db";

import {
    MeetingFormSchema,
    type MeetingFormState,
} from "@/lib/validations";

function getFormValues(formData: FormData) {
    const fields = [
        "date",
        "meetingType",
        "presiding",
        "conducting",
        "announcements",
        "openingHymnNumber",
        "openingHymnTitle",
        "openingPrayer",
        "wardBusiness",
        "stakeBusiness",
        "sacramentHymnNumber",
        "sacramentHymnTitle",
        "speakers",
        "closingHymnNumber",
        "closingHymnTitle",
        "closingPrayer",
    ];

    return Object.fromEntries(
        fields.map((field) => {
            const value = formData.get(field);
            return [field, typeof value === "string" ? value : ""];
        })
    );
}

/**
 * Creates a meeting after validating the submitted form data.
 */
export async function createMeeting(
    _prevState: MeetingFormState,
    formData: FormData
): Promise<MeetingFormState> {
    const result = MeetingFormSchema.safeParse(getFormValues(formData));

    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;

        return {
            message: "Please correct the errors below.",
            errors: Object.fromEntries(
                Object.entries(fieldErrors).filter(([, errors]) => errors)
            ) as Record<string, string[]>,
        };
    }

    try {
        await addMeetingToDatabase(result.data);
    } catch (error) {
        console.error("Create meeting error:", error);

        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "23505"
        ) {
            return {
                message: "A meeting already exists for this date. Please select another date.",
                errors: {
                    date: ["A meeting already exists for this date."],
                },
            };
        }

        throw new Error("Unable to create the meeting. Please try again.");
    }

    revalidatePath("/meetings");
    redirect("/meetings");
}

/**
 * Updates an existing meeting after validating the submitted form data.
 */
export async function updateMeeting(
    id: number,
    _prevState: MeetingFormState,
    formData: FormData
): Promise<MeetingFormState> {
    const result = MeetingFormSchema.safeParse(getFormValues(formData));

    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;

        return {
            message: "Please correct the errors below.",
            errors: Object.fromEntries(
                Object.entries(fieldErrors).filter(([, errors]) => errors)
            ) as Record<string, string[]>,
        };
    }

    try {
        await updateMeetingInDatabase(id, result.data);
    } catch (error) {
        console.error("Update meeting error:", error);
        throw new Error("Unable to update the meeting. Please try again.");
    }

    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);
    redirect("/meetings");
}

/**
 * Deletes a meeting using its submitted ID.
 */
export async function deleteMeeting(formData: FormData): Promise<void> {
    const id = Number(formData.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Invalid meeting ID.");
    }

    try {
        await deleteMeetingFromDatabase(id);
    } catch (error) {
        console.error("Delete meeting error:", error);
        throw new Error("Unable to delete the meeting. Please try again.");
    }

    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);
    redirect("/meetings");
}

