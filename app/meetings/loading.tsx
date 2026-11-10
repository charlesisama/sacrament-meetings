
export default function MeetingsLoading() {
    return (
        <div className="flex min-h-64 items-center justify-center">
            <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

                <p className="font-medium text-slate-600">
                    Loading meeting information...
                </p>
            </div>
        </div>
    );
}
