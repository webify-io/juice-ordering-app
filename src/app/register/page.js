'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	/* state for when the user is being created */
	const [creatingUser, setCreatingUser] = useState(false);
	/* State for when user is created */
	const [userCreated, setUserCreated] = useState(false);
	/* Notify ui that there is an error */
	const [error, setError] = useState(false);

	async function handleFormSubmit(ev) {
		ev.preventDefault();
		setCreatingUser(true);
		/* reset error msg*/
		setError(false);
		/* reset created user msg */
		setUserCreated(false);

		const response = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			setUserCreated(true);
		} else {
			setError(true);
		}
		setCreatingUser(false);
	}

	return (
		<section className="mt-8">
			<h1 className="text-center text-primary text-4xl mb-4">Register</h1>
			{/* Display after succesful registration */}
			{userCreated && (
				<div className="my-4 text-center">
					Thank you for registering. <br />
					Please{' '}
					<Link className="text-blue-400 hover:text-blue-500" href={'/login'}>
						Login &raquo;
					</Link>
					.
				</div>
			)}
			{error && (
				<div className="my-4 text-center">
					An error has occcured. <br />
					Please try again later.
				</div>
			)}
			<form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
				<input
					type="email"
					placeholder="Your Email Address"
					value={email}
					onChange={(ev) => setEmail(ev.target.value)}
					disabled={creatingUser}
				/>
				<input
					type="password"
					placeholder="Choose a Password"
					value={password}
					onChange={(ev) => setPassword(ev.target.value)}
					disabled={creatingUser}
				/>
				<button type="submit" disabled={creatingUser}>
					Create Account
				</button>
				<div className="my-4 text-center text-gray-500">You can also....</div>
				<button
					type="button"
					onClick={() => signIn('google', { callbackUrl: '/' })}
					className="flex gap-4 justify-center"
				>
					<Image
						src={'/google.png'}
						alt="google-icon"
						width={24}
						height={24}
					></Image>
					Sign in with Google
				</button>

				<div className="text-center my-4 text-gray-500 border-t pt-4">
					Already have an account.{' '}
					<Link className="text-blue-400 hover:text-blue-500" href={'/login'}>
						Login Here &raquo;
					</Link>
				</div>
			</form>
		</section>
	);
}
