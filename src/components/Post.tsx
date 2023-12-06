import { FC, useRef } from "react";
import { Post, User, Vote } from "@prisma/client";
import { formatTimeToNow } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import EditorOutput from "./EditorOutput";
import PostVoteClient from "./post-vote/PostVoteClient";
import { buttonVariants } from "./ui/Button";

type PartialVote = Pick<Vote, "type">;

interface PostProps {
	reportName: string;
	post: Post & {
		author: User;
		votes: Vote[];
	};
	commentAmt: number;
	votesAmt: number;
	currentVote?: PartialVote;
}

const Post: FC<PostProps> = ({
	reportName,
	post,
	commentAmt,
	votesAmt,
	currentVote,
}) => {
	const pRef = useRef<HTMLDivElement>(null);
	// console.log(post);

	return (
		<div className='rounded-md bg-white shadow'>
			<div className='px-6 py-4 flex justify-between'>
				<PostVoteClient
					postId={post.id}
					initialVote={currentVote?.type}
					initialVotesAmt={votesAmt}
				/>

				<div className='w-0 flex-1'>
					<div className='max-h-40 mt-1 text-xs text-gray-500'>
						{reportName ? (
							<>
								<a
									className='underline text-zinc-900 text-sm underline-offset-2'
									href={`/fr/${reportName}`}
								>
									Gedung {reportName}
								</a>
								<span className='px-1'>•</span>
							</>
						) : null}
						<span>Posted by {post.author.name}</span>{" "}
						{formatTimeToNow(new Date(post.createdAt))}
					</div>

					<a href={`/fr/${reportName}/post/${post.id}`}>
						<h1 className='text-lg font-semibold py-2 leading-6 text-gray-900'>
							{post.title}
						</h1>
					</a>

					{post.isRepaired ? (
						<span
							className={buttonVariants({
								variant: "ghost",
								size: "sm",
								className:
									"text-slate-900 bg-green-200 mb-2 hover:bg-green-200 hover:cursor-default",
							})}
						>
							Sudah diperbaiki
						</span>
					) : (
						<span
							className={buttonVariants({
								variant: "ghost",
								size: "sm",
								className:
									"text-slate-900 bg-red-200 mb-2 hover:bg-red-200 hover:cursor-default",
							})}
						>
							Butuh perbaikan
						</span>
					)}

					<div
						className='relative text-sm max-h-40 w-full overflow-clip'
						ref={pRef}
					>
						<EditorOutput content={post.content} />

						{pRef.current?.clientHeight === 160 ? (
							<div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent'></div>
						) : null}
					</div>
				</div>
			</div>

			<div className='bg-gray-50 z-20 text-sm p-4 sm:px-6'>
				<a
					className='w-fit flex items-center gap-2'
					href={`/fr/${reportName}/post/${post.id}`}
				>
					<MessageSquare className='h-4 w-4' /> {commentAmt} comments
				</a>
			</div>
		</div>
	);
};

export default Post;
