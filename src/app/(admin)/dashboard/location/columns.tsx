"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const column: ColumnDef<any>[] = [
	{ accessorKey: "name", header: "Lokasi" },
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
							pathname: `/dashboard/location/${id}`,
						}}
					>
						Go to detail
					</Link>
				</Button>
			);
		},
	},
];
