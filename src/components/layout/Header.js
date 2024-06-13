'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import UserAccount from '../icons/UserAccount';
import { useContext } from 'react';
import { CartContext } from '../AppContext';
import ShoppingCart from '../icons/ShoppingCart';

export default function Header() {
	// trying to access session.user and set userName if the session status is 'authenticated'
	const session = useSession();
	const status = session?.status;
	const userData = session.data?.user;

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
		<header className="flex items-center justify-between">
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
				{status === 'authenticated' && (
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
				)}

				{status === 'unauthenticated' && (
					<>
						<Link href={'/login'}>Login</Link>
						<Link
							href={'/register'}
							className="bg-primary rounded-lg text-white px-6 py-2"
						>
							Register
						</Link>
					</>
				)}

				<Link href={'/cart'} className="relative">
					<ShoppingCart />
					<span className="absolute -top-4 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
						{cartProducts.length}
					</span>
				</Link>
				{/* {cartProducts?.length > 0 && (
				)} */}
			</nav>
		</header>
	);
}
