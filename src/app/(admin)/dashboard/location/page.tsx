import { db } from "@/lib/db";
import { column } from "./columns";
import { DataTable } from "./data-table";

export const dynamic = "force-dynamic";
async function getWarehouseData() {
	const location = await db.report.findMany();
	return location;
}

export default async function Page() {
	const location = await getWarehouseData();
	return (
		<>
			<div className='flex-1 space-y-3'>
				<div className='flex items-center'>
					<h2 className='text-3xl font-bold tracking-tight'>Lokasi Laporan</h2>
				</div>
				<DataTable columns={column} data={location} />
			</div>
		</>
	);
}
