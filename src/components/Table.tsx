"use client";

import { ReactElement, useState } from "react";
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
	useReactTable
} from "@tanstack/react-table";

const Table = <T,>({
	data = [],
	columns,
	className,
	search,
	header,
	isLoading,
	pageSize = 20
}: Props<T>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize });
	const [searchValue, setSearch] = useState("");

	const getData = () => {
		if (!search) return data;
		return data.filter(row => search(row).toLowerCase().includes(searchValue.toLowerCase()));
	};

	const table = useReactTable({
		columns,
		data: getData(),
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

	const pageCount = Math.ceil(data.length / pageSize);
	const canPreviousPage = pagination.pageIndex > 0;
	const canNextPage = pagination.pageIndex < pageCount - 1;

	const previousPage = () =>
		setPagination({ ...pagination, pageIndex: pagination.pageIndex - 1 });
	const nextPage = () => setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 });

	return (
		<div
			className={clsx(
				className,
				"flex flex-col bg-base-300/40 rounded-box p-4 overflow-hidden"
			)}
		>
			<header className="flex items-center justify-between">
				{search && (
					<input
						name="search"
						className="input input-bordered w-72 sm:w-96"
						value={searchValue}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search"
					/>
				)}
				{header}
			</header>
			<main className="overflow-auto max-h-[80vh] px-4">
				<table className="size-full table-auto divide-y divide-base-100">
					<thead className="z-30">
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<th
										key={header.id}
										className={clsx(
											"px-4 py-3 text-left text-xs font-medium uppercase tracking-wider",
											{
												["cursor-pointer select-none"]:
													header.column.getCanSort()
											}
										)}
										colSpan={header.colSpan}
										onClick={header.column.getToggleSortingHandler()}
										style={{ width: header.getSize() || "auto" }}
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
										className="px-4 h-20 text-pretty text-ellipsis"
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
			{pageSize > 0 && (
				<footer className="w-full flex justify-between items-center gap-4 mt-auto px-1 pt-2">
					<section className="mt-4 text-sm text-gray-500">
						Page {pagination.pageIndex + 1} of {pageCount} - {data.length} elements
					</section>
					<ul
						className="flex justify-center items-center gap-x-2"
						role="navigation"
						aria-label="pagination"
					>
						<li
							onClick={previousPage}
							className={clsx(
								"btn btn-xs flex items-center justify-center cursor-pointer",
								{ "pointer-events-none opacity-40": !canPreviousPage }
							)}
						>
							<ChevronLeft />
						</li>
						<li
							onClick={nextPage}
							className={clsx(
								"btn btn-xs flex items-center justify-center cursor-pointer",
								{ "pointer-events-none opacity-40": !canNextPage }
							)}
						>
							<ChevronRight />
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
