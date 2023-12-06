"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

const CloseModal = () => {
	const router = useRouter();

	return (
		<>
			<Button
				aria-label='close modal'
				size='sm'
				variant='subtle'
				className='flex items-center space-x-2'
				onClick={() => router.back()}
			>
				<ChevronLeft className='h-4 w-4' />
				<p className='font-semibold'>Back</p>
			</Button>
		</>
	);
};

export default CloseModal;
