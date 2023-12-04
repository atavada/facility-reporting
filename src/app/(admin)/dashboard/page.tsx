import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Archive, Home } from "lucide-react";

const page = () => {
	const currentDate = new Date().toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<>
			<div className='flex-1 space-y-4'>
				<div className='flex items-center justify-between space-y-2'>
					<h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
					<div className='flex items-center space-x-2'>
						<Button className='pointer-events-none' size='sm'>
							{currentDate}
						</Button>
					</div>
				</div>
				<Alert className='bg-sky-100 dark:bg-indigo-900'>
					<AlertTitle>Selamat Datang</AlertTitle>
					<AlertDescription>Sistem Pelaporan Fasilitas Rusak.</AlertDescription>
				</Alert>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Lokasi</CardTitle>
							<Home className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>0</div>
							<p className='text-xs text-muted-foreground'>Jumlah Lokasi</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Laporan</CardTitle>
							<Archive className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>0</div>
							<p className='text-xs text-muted-foreground'>
								Jumlah Laporan Fasilitas
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default page;
