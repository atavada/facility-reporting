import Detail from "./detail";

export default async function Page({ params }: { params: any }) {
	return (
		<>
			<div className='flex-1 space-y-3'>
				<div className='flex items-center'>
					<h2 className='text-3xl font-bold tracking-tight'>Detail Laporan</h2>
				</div>
				<Detail params={params.id} />
			</div>
		</>
	);
}
