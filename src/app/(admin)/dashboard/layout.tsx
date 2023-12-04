"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";

export const dynamic = "force-dynamic";
export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Sidebar className='fixed top-0 left-0 z-40 w-64 transition-transform -translate-x-full md:translate-x-0 bg-white dark:bg-transparent' />
			<div className='md:ml-54'>{children}</div>
		</>
	);
}
