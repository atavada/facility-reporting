import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";

const Layout = async ({
	children,
	params: { slug },
}: {
	children: React.ReactNode;
	params: { slug: string };
}) => {
	const session = await getAuthSession();

	const report = await db.report.findFirst({
		where: { name: slug },
		include: {
			posts: {
				include: {
					author: true,
					votes: true,
				},
			},
		},
	});

	const subscription = !session?.user
		? undefined
		: await db.subscription.findFirst({
				where: {
					report: {
						name: slug,
					},
					user: {
						// @ts-ignore
						id: session.user.id,
					},
				},
		  });

	const isSubscribed = !!subscription;

	if (!report) return notFound();

	const membercount = await db.subscription.count({
		where: {
			report: {
				name: slug,
			},
		},
	});

	return (
		<div className='sm:container max-w-7xl mx-auto h-full pt-12'>
			<div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
					<div className='flex flex-col col-span-2 space-y-6'>{children}</div>

					{/* info sidebar */}

					<div className='hidden md:block overflow-hidden h-fit rounded-lg broder border-gray-200 order-first md:order-last'>
						<div className='px-6 py-4 '>
							<p className='font-semibold py-3'>About Gedung {report.name}</p>
						</div>

						<dl className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white'>
							<div className='flex justify-between gap-x-4 py-3'>
								<dt className='text-gray-500'>Followed by</dt>
								<dd className='text-gray-700'>
									<div className='text-gray-900'>{membercount}</div>
								</dd>
							</div>

							{/* @ts-ignore */}
							{report.creatorId === session?.user?.id ? (
								<div className='flex justify-between gap-x-4 py-3'>
									<p className='text-gray-500'>
										You created this report location
									</p>
								</div>
							) : null}

							{/* @ts-ignore */}
							{report.creatorId !== session?.user?.id ? (
								<SubscribeLeaveToggle
									reportId={report.id}
									isSubscribed={isSubscribed}
									reportName={report.name}
								/>
							) : null}

							<Link
								className={buttonVariants({
									variant: "outline",
									className: "w-full mb-6",
								})}
								href={`fr/${slug}/submit`}
							>
								Create Post
							</Link>
						</dl>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
