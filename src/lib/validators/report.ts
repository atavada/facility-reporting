import { z } from "zod";

export const ReportValidator = z.object({
	name: z.string().min(3).max(20),
});

export const ReportSubscriptionValidator = z.object({
	reportId: z.string(),
});

export type CreateReportPayload = z.infer<typeof ReportValidator>;
export type SubscribeToReportPayload = z.infer<
	typeof ReportSubscriptionValidator
>;
