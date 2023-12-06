import CustomFeed from "@/components/CustomFeed";
import GeneralFeed from "@/components/GeneralFeed";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { HomeIcon, Info } from "lucide-react";
import Link from "next/link";

export default async function Home() {
	const session = await getAuthSession();

	return (
		<>
			<h1 className='font-bold text-3xl md:text-4xl'>SIPERU Feed</h1>
			<p className='font-semibold text-md text-slate-500'>
				Sistem Informasi Pelaporan Fasilitas Rusak
			</p>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md: gap-x-4 py-6'>
				{/* feed */}
				{/* @ts-expect-error server component */}
				{session ? <CustomFeed /> : <GeneralFeed />}

				{/* reporting info */}
				<div className='overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last'>
					<div className='bg-sky-100 px-6 py-4'>
						<p className='font-semibold py-3 flex items-center gap-1.5'>
							<HomeIcon className='w-4 h-4' />
							Home
						</p>
					</div>

					<div className='-my-3 divide-y divide-gray-100 bg-white px-6 py-4 text-sm loading-6'>
						<div className='flex justify-between gap-x-4 py-3'>
							<p className='text-zinc-500'>
								Your personal SIPERU homepage. Come here to check in with your
								suitable report & location.
							</p>
						</div>

						<Link
							href='/fr/location'
							className={buttonVariants({
								className: "w-full mt-4 mb-12 md:mb-20",
							})}
						>
							Create Report
						</Link>
					</div>

					<div className='bg-sky-100 px-6 py-4'>
						<p className='font-semibold py-3 flex items-center gap-1.5'>
							<Info className='w-4 h-4' />
							About
						</p>
					</div>

					<div className='-my-3 divide-y divide-gray-100 bg-white px-6 py-4 text-sm loading-6'>
						<div className='flex justify-between gap-x-4 py-3 mb-6'>
							<p className='text-zinc-500'>
								Welcome to SIPERU{" "}
								<b>(Sistem Informasi Pelaporan Fasilitas Rusak)</b>, your
								reliable partner in streamlining the process of reporting and
								addressing facility damages. SIPERU is a cutting-edge platform
								designed to simplify and enhance the way you report and manage
								issues related to damaged facilities. Our user-friendly
								interface ensures that anyone, from facility managers to regular
								users, can easily submit reports, enabling swift response and
								resolution. With SIPERU, we aim to create a seamless
								communication channel between users and maintenance teams,
								fostering a proactive approach to facility management. Join us
								in building a more efficient and responsive environment with
								SIPERU at the forefront of facility damage reporting.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
