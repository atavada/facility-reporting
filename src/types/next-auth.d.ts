import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = String;
export enum Role {
	USER = "USER",
	ADMIN = "ADMIN",
}

declare module "next-auth/jwt" {
	interface JWT {
		id: UserId;
		username?: string | null;
		role?: Role;
	}
}

declare module "next-auth" {
	interface Session {
		id: UserId;
		username?: string | null;
		role?: Role;
	}
}
