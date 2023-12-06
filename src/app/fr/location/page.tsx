import { buttonVariants } from "@/components/ui/Button";
import { db } from "@/lib/db";
import Link from "next/link";

const Page = async () => {
	const locations = await db.report.findMany();

	return (
		<>
			<div className='container flex items-center h-full max-w-3xl mx-auto'>
				<div className='relative bg-white w-full h-fit p-4 rounded-lg space-y-6'>
					<div className='flex justify-between items-center'>
						<h1 className='text-xl font-semibold'>Select a report location</h1>
					</div>
					<hr className='bg-zinc-500 h-px' />
					<p className='text-lg font-medium'>Location</p>
					<p className='text-xs'>
						Select existing location for reporting a facilities.
					</p>
					<div className='relative'>
						{/* List Location */}
						<ul className='list-none'>
							{locations.map((location) => (
								<li key={location.id} className='text-sm py-1'>
									<Link
										href={`/fr/${location.name}`}
										className={buttonVariants({
											variant: "outline",
											className: "w-full",
										})}
									>
										{location.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
