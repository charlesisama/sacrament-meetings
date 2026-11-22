
"use client";

import { useActionState } from "react";
import type { SacramentMeeting } from "@/lib/types";
import type { MeetingFormState } from "@/lib/validations";

type MeetingFormProps = {
    action: (
        previousState: MeetingFormState,
        formData: FormData
    ) => Promise<MeetingFormState>;
    initialData?: SacramentMeeting;
};

const initialState: MeetingFormState = {
    message: "",
    errors: {},
};

export default function MeetingForm({
    action,
    initialData,
}: MeetingFormProps) {
    const [state, formAction, isPending] = useActionState(
        action,
        initialState
    );

    const meeting = initialData;

    const fieldError = (field: string) => {
        const errors = state.errors?.[field];

        if (!errors?.length) return null;

        return (
            <p
                id={`${field}-error`}
                className="mt-1 text-sm text-red-600"
            >
                {errors[0]}
            </p>
        );
    };

    const inputClass =
        "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";

    const labelClass =
        "block text-sm font-medium text-slate-700";

    return (
        <form action={formAction} className="space-y-6">
            {state.message && (
                <div
                    aria-live="polite"
                    className="rounded-md bg-red-50 p-4 text-sm text-red-700"
                >
                    {state.message}
                </div>
            )}

            {/* Meeting Information */}
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Meeting Information
                </h2>

                <div>
                    <label htmlFor="date" className={labelClass}>
                        Meeting Date
                    </label>

                    <input
                        type="date"
                        id="date"
                        name="date"
                        defaultValue={meeting?.date?.slice(0, 10) ?? ""}
                        required
                        aria-describedby="date-error"
                        className={inputClass}
                    />

                    {fieldError("date")}
                </div>

                <div>
                    <label htmlFor="meetingType" className={labelClass}>
                        Meeting Type
                    </label>

                    <select
                        id="meetingType"
                        name="meetingType"
                        defaultValue={meeting?.meetingType ?? "regular"}
                        required
                        aria-describedby="meetingType-error"
                        className={inputClass}
                    >
                        <option value="regular">Regular</option>
                        <option value="testimony">Testimony</option>
                        <option value="stake">Stake</option>
                        <option value="general">General</option>
                        <option value="special">Special</option>
                    </select>

                    {fieldError("meetingType")}
                </div>

                <div>
                    <label htmlFor="presiding" className={labelClass}>
                        Presiding Officer
                    </label>

                    <input
                        type="text"
                        id="presiding"
                        name="presiding"
                        defaultValue={meeting?.presiding ?? ""}
                        required
                        aria-describedby="presiding-error"
                        className={inputClass}
                    />

                    {fieldError("presiding")}
                </div>

                <div>
                    <label htmlFor="conducting" className={labelClass}>
                        Conducting Officer
                    </label>

                    <input
                        type="text"
                        id="conducting"
                        name="conducting"
                        defaultValue={meeting?.conducting ?? ""}
                        required
                        aria-describedby="conducting-error"
                        className={inputClass}
                    />

                    {fieldError("conducting")}
                </div>
            </section>

            {/* Announcements */}
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Announcements
                </h2>

                <div>
                    <label htmlFor="announcements" className={labelClass}>
                        Announcements
                    </label>

                    <textarea
                        id="announcements"
                        name="announcements"
                        rows={4}
                        defaultValue={meeting?.announcements?.join("\n") ?? ""}
                        aria-describedby="announcements-help announcements-error"
                        className={inputClass}
                    />

                    <p
                        id="announcements-help"
                        className="mt-1 text-sm text-slate-500"
                    >
                        Enter each announcement on a separate line.
                    </p>

                    {fieldError("announcements")}
                </div>
            </section>

            {/* Opening */}
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Opening
                </h2>

                <div>
                    <label
                        htmlFor="openingHymnNumber"
                        className={labelClass}
                    >
                        Opening Hymn Number
                    </label>

                    <input
                        type="number"
                        id="openingHymnNumber"
                        name="openingHymnNumber"
                        min="1"
                        defaultValue={meeting?.openingHymn.number ?? ""}
                        required
                        aria-describedby="openingHymnNumber-error"
                        className={inputClass}
                    />

                    {fieldError("openingHymnNumber")}
                </div>

                <div>
                    <label
                        htmlFor="openingHymnTitle"
                        className={labelClass}
                    >
                        Opening Hymn Title
                    </label>

                    <input
                        type="text"
                        id="openingHymnTitle"
                        name="openingHymnTitle"
                        defaultValue={meeting?.openingHymn.title ?? ""}
                        required
                        aria-describedby="openingHymnTitle-error"
                        className={inputClass}
                    />

                    {fieldError("openingHymnTitle")}
                </div>

                <div>
                    <label htmlFor="openingPrayer" className={labelClass}>
                        Opening Prayer
                    </label>

                    <input
                        type="text"
                        id="openingPrayer"
                        name="openingPrayer"
                        defaultValue={meeting?.openingPrayer ?? ""}
                        required
                        aria-describedby="openingPrayer-error"
                        className={inputClass}
                    />

                    {fieldError("openingPrayer")}
                </div>
            </section>

            {/* Ward Business */}
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Ward and Stake Business
                </h2>

                <div>
                    <label htmlFor="wardBusiness" className={labelClass}>
                        Ward Business
                    </label>

                    <textarea
                        id="wardBusiness"
                        name="wardBusiness"
                        rows={4}
                        defaultValue={
                            meeting?.wardBusiness
                                .map((item) => item.description)
                                .join("\n") ?? ""
                        }
                        aria-describedby="wardBusiness-help wardBusiness-error"
                        className={inputClass}
                    />

                    <p
                        id="wardBusiness-help"
                        className="mt-1 text-sm text-slate-500"
                    >
                        Enter each item of ward business on a separate line.
                    </p>

                    {fieldError("wardBusiness")}
                </div>

                <div>
                    <label htmlFor="stakeBusiness" className={labelClass}>
                        Stake Business
                    </label>

                    <select
                        id="stakeBusiness"
                        name="stakeBusiness"
                        defaultValue={
                            meeting?.stakeBusiness ? "true" : "false"
                        }
                        required
                        aria-describedby="stakeBusiness-error"
                        className={inputClass}
                    >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>

                    {fieldError("stakeBusiness")}
                </div>
            </section>

            {/* Sacrament */}
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Sacrament
                </h2>

                <div>
                    <label
                        htmlFor="sacramentHymnNumber"
                        className={labelClass}
                    >
                        Sacrament Hymn Number
                    </label>

                    <input
                        type="number"
                        id="sacramentHymnNumber"
                        name="sacramentHymnNumber"
                        min="1"
                        defaultValue={meeting?.sacramentHymn.number ?? ""}
                        required
                        aria-describedby="sacramentHymnNumber-error"
                        className={inputClass}
                    />

                    {fieldError("sacramentHymnNumber")}
                </div>

                <div>
                    <label
                        htmlFor="sacramentHymnTitle"
                        className={labelClass}
                    >
                        Sacrament Hymn Title
                    </label>

                    <input
                        type="text"
                        id="sacramentHymnTitle"
                        name="sacramentHymnTitle"
                        defaultValue={meeting?.sacramentHymn.title ?? ""}
                        required
                        aria-describedby="sacramentHymnTitle-error"
                        className={inputClass}
                    />

                    {fieldError("sacramentHymnTitle")}
                </div>
            </section>

            {/* Speakers */}
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Speakers and Musical Numbers
                </h2>

                <div>
                    <label htmlFor="speakers" className={labelClass}>
                        Speakers
                    </label>

                    <textarea
                        id="speakers"
                        name="speakers"
                        rows={6}
                        defaultValue={
                            meeting?.speakers
                                .map(
                                    (speaker) =>
                                        `${speaker.name} | ${speaker.topic} | ${speaker.type}`
                                )
                                .join("\n") ?? ""
                        }
                        aria-describedby="speakers-help speakers-error"
                        className={inputClass}
                    />

                    <p
                        id="speakers-help"
                        className="mt-1 text-sm text-slate-500"
                    >
                        Enter one person or musical number per line using:
                        <br />
                        <strong>Name | Topic | speaker</strong>
                        <br />
                        or
                        <br />
                        <strong>Name | Topic | musical-number</strong>
                    </p>

                    {fieldError("speakers")}
                </div>
            </section>

            {/* Closing */}
            <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                    Closing
                </h2>

                <div>
                    <label
                        htmlFor="closingHymnNumber"
                        className={labelClass}
                    >
                        Closing Hymn Number
                    </label>

                    <input
                        type="number"
                        id="closingHymnNumber"
                        name="closingHymnNumber"
                        min="1"
                        defaultValue={meeting?.closingHymn.number ?? ""}
                        required
                        aria-describedby="closingHymnNumber-error"
                        className={inputClass}
                    />

                    {fieldError("closingHymnNumber")}
                </div>

                <div>
                    <label
                        htmlFor="closingHymnTitle"
                        className={labelClass}
                    >
                        Closing Hymn Title
                    </label>

                    <input
                        type="text"
                        id="closingHymnTitle"
                        name="closingHymnTitle"
                        defaultValue={meeting?.closingHymn.title ?? ""}
                        required
                        aria-describedby="closingHymnTitle-error"
                        className={inputClass}
                    />

                    {fieldError("closingHymnTitle")}
                </div>

                <div>
                    <label htmlFor="closingPrayer" className={labelClass}>
                        Closing Prayer
                    </label>

                    <input
                        type="text"
                        id="closingPrayer"
                        name="closingPrayer"
                        defaultValue={meeting?.closingPrayer ?? ""}
                        required
                        aria-describedby="closingPrayer-error"
                        className={inputClass}
                    />

                    {fieldError("closingPrayer")}
                </div>
            </section>

            {/* Submit */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending
                        ? "Saving Meeting..."
                        : meeting
                            ? "Update Meeting"
                            : "Create Meeting"}
                </button>
            </div>
        </form>
    );
}
