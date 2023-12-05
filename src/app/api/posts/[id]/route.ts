import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params: { id } }: any) {
	const session = await getAuthSession();

	const whereConditions = {
		id: id as string,
	};

	const posts = await db.post.findFirst({
		where: whereConditions,
		include: {
			report: true,
			votes: true,
			author: true,
			comments: true,
		},
	});

	if (!posts) {
		return new Response(`Post with id ${id} not found`, {
			status: 404,
		});
	}

	return new Response(JSON.stringify(posts), { status: 200 });
}

export async function PATCH(req: Request, { params: { id } }: any) {
	const session = await getAuthSession();

	const whereConditions = {
		id: id as string,
	};

	const updatedPost = await db.post.update({
		where: whereConditions,
		data: {
			isRepaired: true,
		},
	});

	if (!updatedPost) {
		return new Response(`Failed to update post with id ${id}`, {
			status: 500,
		});
	}

	return new Response(JSON.stringify(updatedPost), { status: 200 });
}
