"use client";

import { FC, startTransition } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { SubscribeToReportPayload } from "@/lib/validators/report";
import axios, { AxiosError } from "axios";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SubscribeLeaveToggleProps {
	reportId: string;
	isSubscribed: boolean;
	reportName: string;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
	reportId,
	isSubscribed,
	reportName,
}) => {
	const loginToast = useCustomToast();
	const router = useRouter();

	const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
		mutationFn: async () => {
			const payload: SubscribeToReportPayload = {
				reportId,
			};

			const { data } = await axios.post("/api/report/subscribe", payload);
			return data as string;
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return loginToast();
				}
			}

			return toast({
				title: "There was a problem",
				description: "Something went wrong, please try again.",
				variant: "destructive",
			});
		},

		onSuccess: () => {
			startTransition(() => {
				router.refresh();
			});

			return toast({
				title: "Followed",
				description: `You are now follow to ${reportName}.`,
			});
		},
	});

	const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
		mutationFn: async () => {
			const payload: SubscribeToReportPayload = {
				reportId,
			};

			const { data } = await axios.post("/api/report/unsubscribe", payload);
			return data as string;
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return loginToast();
				}
			}

			return toast({
				title: "There was a problem",
				description: "Something went wrong, please try again.",
				variant: "destructive",
			});
		},

		onSuccess: () => {
			startTransition(() => {
				router.refresh();
			});

			return toast({
				title: "Unfollowed",
				description: `You are now unfollow from fr/${reportName}.`,
			});
		},
	});

	return isSubscribed ? (
		<Button
			isLoading={isUnsubLoading}
			onClick={() => unsubscribe()}
			className='w-full mt-1 mb-4'
		>
			Unfollow Location
		</Button>
	) : (
		<Button
			isLoading={isSubLoading}
			onClick={() => subscribe()}
			className='w-full mt-1 mb-4'
		>
			Follow to post
		</Button>
	);
};

export default SubscribeLeaveToggle;
