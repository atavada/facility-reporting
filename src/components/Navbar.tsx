import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import Image from "next/image";
import SearchBar from "./SearchBar";

const Navbar = async () => {
	const session = await getAuthSession();

	return (
		<>
			<div className='fixed top-0 inset-x-0 h-fit bg-white border-b border-zinc-300 z-[10] py-2 shadow-md'>
				<div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
					{/* Logo */}
					<Link href='/' className='flex gap-2 items-center'>
						<Image
							src='/flogo.png'
							alt='Facility Reporting Logo'
							width='30'
							height='30'
						/>
						<p className='hidden text-zinc-700 text-lg font-bold md:block'>
							SIPERU
						</p>
					</Link>

					{/* Search bar */}
					<SearchBar />

					{session?.user ? (
						<UserAccountNav user={session.user} />
					) : (
						<Link href='/sign-in' className={buttonVariants()}>
							Sign In
						</Link>
					)}
				</div>
			</div>
		</>
	);
};

export default Navbar;
