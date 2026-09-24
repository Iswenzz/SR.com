"use client";

import { ReactElement, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Database, SortAsc, SortDesc } from "lucide-react";
import clsx from "clsx";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	SortingState,
	RowData,
	useReactTable
} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ColumnMeta<TData extends RowData, TValue> {
		className?: string;
	}
}

const EMPTY: never[] = [];

const Table = <T,>({
	data = EMPTY,
	columns,
	className,
	search,
	header,
	isLoading,
	pageSize = 20
}: Props<T>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize });
	const [searchValue, setSearchValue] = useState("");
	const [previousData, setPreviousData] = useState(data);

	// New data (e.g. switching map or mode) starts back on the first page.
	if (previousData !== data) {
		setPreviousData(data);
		setPagination({ ...pagination, pageIndex: 0 });
	}

	const filteredData = useMemo(() => {
		const query = searchValue.trim().toLowerCase();
		if (!search || !query) return data;
		return data.filter(row => search(row).toLowerCase().includes(query));
	}, [data, search, searchValue]);

	const setSearch = (value: string) => {
		setSearchValue(value);
		setPagination({ ...pagination, pageIndex: 0 });
	};

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		columns,
		data: filteredData,
		defaultColumn: {
			size: 0,
			minSize: 0,
			maxSize: Number.MAX_SAFE_INTEGER
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		state: { sorting, pagination }
	});

	const pageCount = Math.ceil(filteredData.length / pageSize);
	const canPreviousPage = pagination.pageIndex > 0;
	const canNextPage = pagination.pageIndex < pageCount - 1;

	const previousPage = () =>
		setPagination({ ...pagination, pageIndex: pagination.pageIndex - 1 });
	const nextPage = () => setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 });

	return (
		<div
			className={clsx(
				className,
				"flex flex-col bg-black/20 backdrop-blur-lg rounded-box p-2 sm:p-4 overflow-hidden"
			)}
		>
			<header className="flex items-center justify-between">
				{search && (
					<input
						name="search"
						className="input input-bordered w-full sm:w-96"
						value={searchValue}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search"
						aria-label="Search"
					/>
				)}
				{header}
			</header>
			<main className="overflow-auto max-h-[80vh] sm:px-4">
				<table className="size-full table-auto divide-y divide-base-100">
					<thead className="z-30">
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<th
										key={header.id}
										className={clsx(
											"px-2 sm:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider",
											header.column.columnDef.meta?.className,
											{
												["cursor-pointer select-none"]:
													header.column.getCanSort()
											}
										)}
										colSpan={header.colSpan}
										onClick={header.column.getToggleSortingHandler()}
										style={{
											width: header.getSize() || "auto",
											minWidth: header.getSize() || "auto"
										}}
									>
										<div className="min-h-6 flex justify-between items-center">
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{header.column.getCanSort() &&
												header.column.getIsSorted() === "asc" && (
													<SortAsc size={16} />
												)}
											{header.column.getCanSort() &&
												header.column.getIsSorted() === "desc" && (
													<SortDesc size={16} />
												)}
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="divide-y divide-base-100">
						{table.getRowModel().rows.map(row => (
							<tr key={row.id} className="hover:bg-base-100/10">
								{row.getVisibleCells().map(cell => (
									<td
										key={cell.id}
										className={clsx(
											"px-2 sm:px-4 h-20 text-pretty text-ellipsis",
											cell.column.columnDef.meta?.className
										)}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</main>
			{!table.getRowCount() && (
				<section className="flex flex-col flex-auto items-center justify-center text-gray-500 my-8">
					<Database className="mb-4" size={48} />
					<p className="text-xl">No data</p>
				</section>
			)}
			{pageCount > 0 && (
				<footer className="w-full flex justify-between items-center gap-4 mt-auto px-1 pt-2">
					<section className="mt-4 text-sm text-gray-500">
						Page {pagination.pageIndex + 1} of {pageCount} - {filteredData.length}{" "}
						elements
					</section>
					<ul
						className="flex justify-center items-center gap-x-2"
						role="navigation"
						aria-label="pagination"
					>
						<li>
							<button
								className="btn btn-xs flex items-center justify-center"
								onClick={previousPage}
								disabled={!canPreviousPage}
								aria-label="Previous page"
							>
								<ChevronLeft />
							</button>
						</li>
						<li>
							<button
								className="btn btn-xs flex items-center justify-center"
								onClick={nextPage}
								disabled={!canNextPage}
								aria-label="Next page"
							>
								<ChevronRight />
							</button>
						</li>
					</ul>
				</footer>
			)}
			{isLoading && <div className="skeleton size-full" />}
		</div>
	);
};

type Props<T> = {
	data: T[];
	columns: ColumnDef<T>[];
	className?: string;
	search?: (row: T) => string;
	header?: ReactElement;
	isLoading?: boolean;
	pageSize?: number;
};

export default Table;
