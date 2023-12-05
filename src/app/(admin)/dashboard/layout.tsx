import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { getAuthSession } from "@/lib/auth";
import Image from "next/image";

export const dynamic = "force-dynamic";
export default async function Layout({ children }: { children: ReactNode }) {
	const session = await getAuthSession();

	if (session?.user?.role !== "ADMIN") {
		return (
			<>
				<div className='lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16'>
					<div className='xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0'>
						<div className='relative'>
							<div className='absolute'>
								<div className=''>
									<h1 className='my-2 text-gray-800 font-bold text-2xl'>
										"Looks like you&quot;ve found the doorway to the great
										nothing"
									</h1>
									<p className='my-2 text-gray-800'>
										Sorry about that! Please visit our hompage to get where you
										need to go.
									</p>
									<button className='sm:w-full lg:w-auto my-2 border rounded-lg md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50'>
										<a href='/'>Take me there!</a>
									</button>
								</div>
							</div>
							<div>
								<Image
									alt='error-img-1'
									src='https://i.ibb.co/G9DC8S0/404-2.png'
								/>
							</div>
						</div>
					</div>
					<div>
						<Image alt='error-img-2' src='https://i.ibb.co/ck1SGFJ/Group.png' />
					</div>
				</div>
			</>
		);
	}
	return (
		<>
			<Sidebar className='fixed top-0 left-0 z-40 w-64 transition-transform -translate-x-full md:translate-x-0 bg-white dark:bg-transparent' />
			<div className='md:ml-54'>{children}</div>
		</>
	);
}
