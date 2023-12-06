import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
	const url = new URL(req.url);

	const session = await getAuthSession();

	let followedCommunitiesIds: string[] = [];

	if (session) {
		const followedCommunities = await db.subscription.findMany({
			where: {
				// @ts-ignore
				userId: session?.user?.id,
			},
			include: {
				report: true,
			},
		});

		followedCommunitiesIds = followedCommunities.map(({ report }) => report.id);
	}

	try {
		const { limit, page, reportName } = z
			.object({
				limit: z.string(),
				page: z.string(),
				reportName: z.string().nullish().optional(),
			})
			.parse({
				reportName: url.searchParams.get("reportName"),
				limit: url.searchParams.get("limit"),
				page: url.searchParams.get("page"),
			});

		let whereClause = {};

		if (reportName) {
			whereClause = {
				report: {
					name: reportName,
				},
			};
		} else if (session) {
			whereClause = {
				report: {
					id: {
						in: followedCommunitiesIds,
					},
				},
			};
		}

		const posts = await db.post.findMany({
			take: parseInt(limit),
			skip: parseInt(page) - 1 * parseInt(limit),
			orderBy: {
				createdAt: "desc",
			},
			include: {
				report: true,
				votes: true,
				author: true,
				comments: true,
			},
			where: whereClause,
		});

		return new Response(JSON.stringify(posts));
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response("Invalid request data passed", { status: 422 });
		}

		return new Response("Could not fetch more posts", {
			status: 500,
		});
	}
}
