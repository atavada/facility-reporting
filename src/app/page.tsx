import CustomFeed from "@/components/CustomFeed";
import GeneralFeed from "@/components/GeneralFeed";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
	const session = await getAuthSession();

	return (
		<>
			<h1 className='font-bold text-3xl md:text-4xl'>SIPERU Feed</h1>
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

					<div className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm loading-6'>
						<div className='flex justify-between gap-x-4 py-3'>
							<p className='text-zinc-500'>
								Your personal SIPERU homepage. Come here to check in with your
								suitable report & location.
							</p>
						</div>

						<Link
							href='/fr/location'
							className={buttonVariants({
								className: "w-full mt-4 mb-6",
							})}
						>
							Create Report
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
