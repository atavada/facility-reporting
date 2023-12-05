"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const column: ColumnDef<any>[] = [
	{
		accessorKey: "votes",
		header: "Vote",
		cell: ({ row }) => {
			const votes = row.original.votes;
			const totalVotes = votes.reduce((acc: any, vote: any) => {
				if (vote.type === "UP") return acc + 1;
				if (vote.type === "DOWN") return acc - 1;
				return acc;
			}, 0);
			return <span>{totalVotes}</span>;
		},
	},
	{ accessorKey: "title", header: "Title" },
	{ accessorKey: "report.name", header: "Lokasi" },
	{
		accessorKey: "isRepaired",
		header: "Status",
		cell: ({ row }) => {
			const isRepaired = row.original.isRepaired;
			return <span>{isRepaired ? "Sudah dipebaiki" : "Belum diperbaiki"}</span>;
		},
	},
	{
		accessorKey: "createdAt",
		header: "Tanggal dilaporkan",
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt);
			const formattedDate = `${date.getDate()} ${new Intl.DateTimeFormat(
				"id-ID",
				{ month: "long" }
			).format(date)} ${date.getFullYear()}`;
			return <span>{formattedDate}</span>;
		},
	},
	{
		accessorKey: "updatedAt",
		header: "Tanggal diperbaiki",
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt);
			const formattedDate = `${date.getDate()} ${new Intl.DateTimeFormat(
				"id-ID",
				{ month: "long" }
			).format(date)} ${date.getFullYear()}`;
			return <span>{formattedDate}</span>;
		},
	},
	{
		header: "Action",
		id: "detail",
		cell: ({ row }) => {
			const report = row.original;
			const id = report.id;
			return (
				<Button variant='outline' size='sm'>
					<Link
						href={{
							pathname: `/dashboard/report/${id}`,
						}}
					>
						Go to detail
					</Link>
				</Button>
			);
		},
	},
];
