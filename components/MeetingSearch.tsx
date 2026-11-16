
"use client";

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }

        // Return to the first page whenever a new search is performed.
        params.set("page", "1");

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative mb-6">
            <label
                htmlFor="meeting-search"
                className="sr-only"
            >
                Search meetings
            </label>

            <input
                id="meeting-search"
                type="search"
                placeholder="Search by meeting type, presiding officer, conducting officer, or speaker..."
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(event) => handleSearch(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
        </div>
    );
}
