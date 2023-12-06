import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReportSubscriptionValidator } from "@/lib/validators/report";
import { z } from "zod";

export async function POST(req: Request) {
	try {
		const session = await getAuthSession();

		if (!session?.user) {
			return new Response("Unauthorized", { status: 401 });
		}

		const body = await req.json();

		const { reportId } = ReportSubscriptionValidator.parse(body);

		const subscribtionExists = await db.subscription.findFirst({
			where: {
				reportId,
				// @ts-ignore
				userId: session.user.id,
			},
		});

		if (subscribtionExists) {
			return new Response("Already subscribed", { status: 400 });
		}

		await db.subscription.create({
			data: {
				reportId,
				// @ts-ignore
				userId: session.user.id,
			},
		});

		return new Response(reportId);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response("Invalid request data passed", { status: 422 });
		}

		return new Response("Could not subscribe report, try again later", {
			status: 500,
		});
	}
}
