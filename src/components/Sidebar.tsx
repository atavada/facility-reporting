"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import { LayoutGrid, ClipboardList, Home } from "lucide-react";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
	const pathname = usePathname();
	return (
		<>
			<div className={cn("flex flex-col h-screen border-r", className)}>
				<div className='px-4 py-5'>
					<Link href='/'>
						<p className='text-center uppercase font-bold'>SIPERU</p>
					</Link>
				</div>
				<div className='space-y-4 py-4'>
					<div className='px-4 py-2'>
						<Link href='/dashboard'>
							<Button
								variant={pathname == "/dashboard" ? "default" : "ghost"}
								size='sm'
								className='w-full justify-start'
							>
								<LayoutGrid className='mr-2 h-4 w-4' />
								Dashboard
							</Button>
						</Link>
					</div>
					<div className='px-4 py-2'>
						<h2 className='mb-2 px-2 text-lg font-semibold tracking-tight'>
							Management
						</h2>
						<div className='space-y-1'>
							<Link href='/dashboard/location'>
								<Button
									variant={
										pathname.startsWith("/dashboard/location") ||
										pathname == "/dashboard/newlocation"
											? "default"
											: "ghost"
									}
									size='sm'
									className='w-full justify-start mb-1'
								>
									<Home className='mr-2 h-4 w-4' />
									Lokasi
								</Button>
							</Link>
							<Link href='/dashboard/report'>
								<Button
									variant={
										pathname.startsWith("/dashboard/report")
											? "default"
											: "ghost"
									}
									size='sm'
									className='w-full justify-start'
								>
									<ClipboardList className='mr-2 h-4 w-4' />
									Laporan Fasilitas
								</Button>
							</Link>
						</div>
					</div>
					{/* <div className='px-4 py-2'>
						<hr className='mb-2 h-0.5 bg-stone-900' />
						<div className='space-y-1'>
							<Link href='/dashboard/user'>
								<Button
									variant={pathname == "/dashboard/user" ? "default" : "ghost"}
									size='sm'
									className='w-full justify-start'
								>
									<User className='mr-2 h-4 w-4' />
									User
								</Button>
							</Link>
						</div>
					</div> */}
				</div>
			</div>
		</>
	);
}
