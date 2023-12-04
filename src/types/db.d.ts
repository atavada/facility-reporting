import { Post, Comment, Report, User, Vote } from "@prisma/client";

export type ExtendedPost = Post & {
	report: Report;
	votes: Vote[];
	author: User;
	comments: Comment[];
};
