import { db } from "@/lib/db";
import { column } from "./columns";
import { DataTable } from "./data-table";

async function getWarehouseData() {
	const report = await db.post.findMany({
		include: {
			report: true,
			votes: true,
		},
	});
	return report;
}

export default async function Page() {
	const report = await getWarehouseData();
	return (
		<>
			<div className='flex-1 space-y-3'>
				<div className='flex items-center'>
					<h2 className='text-3xl font-bold tracking-tight'>
						Laporan Fasilitas
					</h2>
				</div>
				<DataTable columns={column} data={report} />
			</div>
		</>
	);
}
