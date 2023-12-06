import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import PostFeed from "./PostFeed";
import { getAuthSession } from "@/lib/auth";

const CustomFeed = async () => {
	const session = await getAuthSession();

	const followedReport = await db.subscription.findMany({
		where: {
			// @ts-ignore
			userId: session?.user?.id,
		},
		include: {
			report: true,
		},
	});

	const posts = await db.post.findMany({
		where: {
			report: {
				name: {
					in: followedReport.map(({ report }) => report.id),
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			votes: true,
			author: true,
			comments: true,
			report: true,
		},
		take: INFINITE_SCROLLING_PAGINATION_RESULTS,
	});

	return <PostFeed initialPosts={posts} />;
};

export default CustomFeed;
