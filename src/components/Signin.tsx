import Link from "next/link";
import UserAuthForm from "./UserAuthForm";
import Image from "next/image";

const SignIn = () => {
	return (
		<>
			<div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<Image
						src='/flogo.png'
						alt='Facility Reporting Logo'
						width='30'
						height='30'
						className='mx-auto'
					/>
					<h1 className='text-2xl font-semibold tracking-tight'>
						Welcome Back
					</h1>
					<p className='text-sm max-w-xs mx-auto'>
						By continuing, you are setting up a SIPERU account and agree to our
						User Agreement and Privacy Policy.
					</p>

					{/* Sign in form */}
					<UserAuthForm />

					<p className='px-8 text-center text-sm text-zinc-700'>
						New to SIPERU?{" "}
						<Link
							href='/sign-up'
							className='hover:text-zinc-800 text-sm underline underline-offset-4'
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default SignIn;
