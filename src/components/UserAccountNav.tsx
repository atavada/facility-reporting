"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { User } from "next-auth";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

interface UserAccountNavProps {
	user: Pick<User, "name" | "image" | "email" | "role">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<UserAvatar
						className='h-8 w-8'
						user={{
							name: user.name || null,
							image: user.image || null,
						}}
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='bg-white'>
					<div className='flex items-center justify-start gap-2 p-2'>
						<div className='flex flex-col space-y-1 loading-none'>
							{user.name && <p className='font-medium'>{user.name}</p>}
							{user.email && (
								<p className='w-[200] truncate text-sm text-zinc-700'>
									{user.email}
								</p>
							)}
						</div>
					</div>

					<DropdownMenuSeparator />

					{user.role === "ADMIN" && (
						<DropdownMenuItem
							asChild
							className='bg-[#0861f2] text-white focus:bg-[#0456db] focus:text-white'
						>
							<Link href='/dashboard'>Dashboard</Link>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem asChild>
						<Link href='/'>Feed</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href='/fr/create'>Create Report</Link>
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem
						onSelect={(event) => {
							event.preventDefault();
							signOut({
								callbackUrl: `${window.location.origin}/sign-in`,
							});
						}}
						className='cursor-pointer'
					>
						<LogOut className='mr-2 h-4 w-4' />
						Sign out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default UserAccountNav;
