
"use client";

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

type PaginationProps = {
    totalPages: number;
    currentPage: number;
};

export default function Pagination({
    totalPages,
    currentPage,
}: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    function handlePageChange(page: number) {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", page.toString());

        replace(`${pathname}?${params.toString()}`);
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            aria-label="Meeting pagination"
            className="mt-8 flex items-center justify-center gap-4"
        >
            <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Previous
            </button>

            <span
                className="text-sm text-gray-600"
                aria-live="polite"
            >
                Page {currentPage} of {totalPages}
            </span>

            <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </button>
        </nav>
    );
}
