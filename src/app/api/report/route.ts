import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReportValidator } from "@/lib/validators/report";
import { z } from "zod";

export async function POST(req: Request) {
	try {
		const session = await getAuthSession();

		if (!session?.user) {
			return new Response("Unautorized", { status: 401 });
		}

		const body = await req.json();
		const { name } = ReportValidator.parse(body);

		const reportExists = await db.report.findFirst({
			where: {
				name,
			},
		});

		if (reportExists) {
			return new Response("Report already exists", { status: 409 });
		}

		const report = await db.report.create({
			data: {
				name,
				// @ts-ignore
				creatorId: session.user.id,
			},
		});

		await db.subscription.create({
			data: {
				// @ts-ignore
				userId: session.user.id,
				reportId: report.id,
			},
		});

		return new Response(report.name);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 });
		}

		return new Response("Could not create report", { status: 500 });
	}
}
