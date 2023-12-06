import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
	try {
		const session = await getAuthSession();

		if (!session?.user) {
			return new Response("Unauthorized", { status: 401 });
		}

		const body = await req.json();

		const { reportId, title, content } = PostValidator.parse(body);

		const subscribtionExists = await db.subscription.findFirst({
			where: {
				reportId,
				// @ts-ignore
				userId: session.user.id,
			},
		});

		if (!subscribtionExists) {
			return new Response("Subscribe to post", { status: 400 });
		}

		await db.post.create({
			data: {
				title,
				content,
				// @ts-ignore
				authorId: session.user.id,
				reportId,
			},
		});

		return new Response("OK");
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response("Invalid request data passed", { status: 422 });
		}

		return new Response("Could not post report at this time, try again later", {
			status: 500,
		});
	}
}
