'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import UserAccount from '../icons/UserAccount';
import { useContext, useState } from 'react';
import { CartContext } from '../AppContext';
import ShoppingCart from '../icons/ShoppingCart';
import Bars3 from '../icons/Bars3';

function AuthLinks({ status, userName }) {
	if (status === 'authenticated') {
		return (
			<>
				<Link
					href={'/profile'}
					className="flex items-center whitespace-nowrap gap-x-2 px-2 py-2"
				>
					<UserAccount />
					Hello, {userName}
				</Link>

				<button
					onClick={() => signOut()}
					className="bg-primary rounded-lg text-white px-6 py-2  hover:bg-red-600 hover:shadow-md transition-all"
				>
					Logout
				</button>
			</>
		);
	}

	if (status === 'unauthenticated') {
		return (
			<>
				<Link href={'/login'}>Login</Link>
				<Link
					href={'/register'}
					className="bg-primary rounded-lg text-white px-6 py-2"
				>
					Register
				</Link>
			</>
		);
	}
}

export default function Header() {
	// trying to access session.user and set userName if the session status is 'authenticated'
	const session = useSession();
	const status = session?.status;
	const userData = session.data?.user;

	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	const { cartProducts } = useContext(CartContext);

	let userName = userData?.name || userData?.email;

	// If the session is authenticated:
	if (userName && userName.includes(' ')) {
		userName = userName.split(' ')[0];
	}

	/* const status = session?.status; */
	// Retrieve name prop from session - google
	/* const userData = session.data?.user;
	let userName = userData?.name || userData?.email;
	if (userName.includes(' ')) {
		userName = userName.split(' ')[0];
	} */
	return (
		<header>
			<div className="flex md:hidden justify-between items-center">
				<Link className="text-primary font-semibold text-2xl" href="/">
					Eezi-Fruit
				</Link>

				<div className="flex gap-6 items-center">
					<Link href={'/cart'} className="relative">
						<ShoppingCart />
						{cartProducts?.length > 0 && (
							<span className="absolute -top-4 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
								{cartProducts.length}
							</span>
						)}
					</Link>

					<button
						className="p-2"
						onClick={() => setMobileNavOpen((prev) => !prev)}
					>
						<Bars3 />
					</button>
				</div>
			</div>
			{mobileNavOpen && (
				<div
					onClick={() => setMobileNavOpen(false)}
					className="md:hidden p-4 bg-slate-300 rounded-lg mt-2"
				>
					<nav className="flex flex-col items-center gap-8 text-gray-500 font-semibold">
						<Link href={'/'}>Home</Link>
						<Link href={'/menu'}>Menu</Link>
						<Link href={'/#about'}>About</Link>
						<Link href={'/#contact'}>Contact</Link>
						<AuthLinks status={status} userName={userName} />
					</nav>
				</div>
			)}

			<div className="hidden md:flex items-center justify-between">
				<Link className="text-primary font-semibold text-2xl" href="/">
					Eezi-Fruit
				</Link>
				<nav className="flex items-center gap-8 text-gray-500 font-semibold">
					<Link href={'/'}>Home</Link>
					<Link href={'/menu'}>Menu</Link>
					<Link href={'/#about'}>About</Link>
					<Link href={'/#contact'}>Contact</Link>
				</nav>
				<nav className="flex items-center gap-4 text-gray-500 font-semibold">
					<AuthLinks status={status} userName={userName} />

					<Link href={'/cart'} className="relative">
						<ShoppingCart />
						{cartProducts?.length > 0 && (
							<span className="absolute -top-4 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
								{cartProducts.length}
							</span>
						)}
					</Link>
				</nav>
			</div>
		</header>
	);
}
