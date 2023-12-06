import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import CreateComment from "./CreateComment";
import PostComment from "./PostComment";

interface CommentsSectionProps {
	postId: string;
}

const CommentsSection = async ({ postId }: CommentsSectionProps) => {
	const session = await getAuthSession();

	const comments = await db.comment.findMany({
		where: {
			postId,
			replyToId: null,
		},
		include: {
			author: true,
			votes: true,
			replies: {
				include: {
					author: true,
					votes: true,
				},
			},
		},
	});

	return (
		<div className='flex flex-col gap-y-4 mt-4'>
			<hr className='w-full h-px my-6' />

			<CreateComment postId={postId} />

			<div className='flex flex-col gap-y-6 mt-4'>
				{comments
					.filter((comment) => !comment.replyToId)
					.map((topLevelComment) => {
						const topLevelCommentVotesAmt = topLevelComment.votes.reduce(
							(acc, vote) => {
								if (vote.type === "UP") return acc + 1;
								if (vote.type === "DOWN") return acc - 1;
								return acc;
							},
							0
						);

						const topLevelCommentVote = topLevelComment.votes.find(
							// @ts-ignore
							(vote) => vote.userId === session?.user?.id
						);

						return (
							<div key={topLevelComment.id} className='flex flex-col'>
								<div className='mb-2'>
									<PostComment
										postId={postId}
										votesAmt={topLevelCommentVotesAmt}
										currentVote={topLevelCommentVote}
										comment={topLevelComment}
									/>
								</div>

								{/* render replies */}
								{topLevelComment.replies
									.sort((a, b) => b.votes.length - a.votes.length)
									.map((reply) => {
										const replyVotesAmt = reply.votes.reduce((acc, vote) => {
											if (vote.type === "UP") return acc + 1;
											if (vote.type === "DOWN") return acc - 1;
											return acc;
										}, 0);

										const replyVote = reply.votes.find(
											// @ts-ignore
											(vote) => vote.userId === session?.user?.id
										);

										return (
											<div
												key={reply.id}
												className='ml-1 py-2 pl-4 border-l-2 border-zinc-200'
											>
												<PostComment
													comment={reply}
													currentVote={replyVote}
													votesAmt={replyVotesAmt}
													postId={postId}
												/>
											</div>
										);
									})}
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default CommentsSection;
