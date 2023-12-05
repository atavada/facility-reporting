"use client";

import EditorOutput from "@/components/EditorOutput";
import { Button } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const formatDateTime = (dateTimeString: any) => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const dateTime = new Date(dateTimeString);
	return dateTime.toLocaleDateString(undefined, options);
};

export default function Detail({ params }: { params: any }) {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [post, setPost] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`/api/posts/${params}`);
				const fetchedData = await res.json();
				setPost(fetchedData);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [params]);

	const handleRepaired = async () => {
		try {
			setIsLoading(true);
			const res = await fetch(`/api/posts/${params}`, {
				method: "PATCH",
			});

			if (res.ok) {
				const updatedData = await fetch(`/api/posts/${params}`);
				const updatedPost = await updatedData.json();
				setPost(updatedPost);
				toast({
					title: "Berhasil Menandai Diperbaiki",
					description: "Laporan berhasil ditandai sudah diperbaiki",
				});
			}
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Gagal Menandai Diperbaiki",
				description: "Laporan gagal ditandai sudah diperbaiki",
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className='flex items-center'>
				<Loader2 className='mr-2 h-4 w-4 animate-spin' />
				Mohon tunggu...
			</div>
		);
	}

	console.log(post);

	return (
		<>
			<div className='pt-8'>
				<div className='mb-5'>
					<h3 className='text-lg font-bold'>Judul Laporan</h3>
					<p>{post.title}</p>
				</div>
				<div className='mb-5'>
					<h3 className='text-lg font-bold'>Lokasi</h3>
					<p>Gedung {post.report.name}</p>
				</div>
				<div className='mb-5'>
					<h3 className='text-lg font-bold'>Isi Laporan</h3>
					<EditorOutput content={post.content} />
				</div>
				<div className='mb-5'>
					<h3 className='text-lg font-bold'>Pembuat Laporan</h3>
					<p>{post.author?.name}</p>
				</div>
				<div className='mb-5'>
					<h3 className='text-lg font-bold'>Waktu Dibuat</h3>
					<p>
						<span>{formatDateTime(post.createdAt)}</span>
					</p>
				</div>
				<div className='mb-5'>
					<h3 className='text-lg font-bold'>Waktu Diperbaiki</h3>
					<p>
						<span>{formatDateTime(post.updatedAt)}</span>
					</p>
				</div>
				<div className='mb-5'>
					<h3 className='text-lg font-bold'>Status Laporan</h3>
					<p>{post.isRepaired ? "Sudah diperbaiki" : "Belum diperbaiki"}</p>
				</div>
				{!isLoading ? (
					<Button
						className='mt-3'
						onClick={handleRepaired}
						disabled={post.isRepaired}
					>
						{post.isRepaired ? "Sukses Diperbaiki" : "Tandai Sudah Diperbaiki"}
					</Button>
				) : (
					<Button isLoading={isLoading} />
				)}
			</div>
		</>
	);
}
