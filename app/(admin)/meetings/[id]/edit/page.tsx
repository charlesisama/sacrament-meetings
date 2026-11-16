
export const instant = false;

type EditMeetingPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditMeetingPage({
    params,
}: EditMeetingPageProps) {
    const { id } = await params;

    return (
        <section className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                Week 04 Feature
            </p>

            <h2 className="mb-3 text-2xl font-bold text-slate-900">
                Edit Meeting
            </h2>

            <p className="text-slate-600">
                Editing meeting #{id} will be implemented in Week 04.
            </p>
        </section>
    );
}
