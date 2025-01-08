'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	/* state to disable login form fields while loging in */
	const [loginInProgress, setLoginInProgress] = useState(false);

	async function handleFormSubmit(ev) {
		ev.preventDefault();
		setLoginInProgress(true);

		// Pass the credentials to the signIn function
		await signIn('credentials', { email, password, callbackUrl: '/' });

		setLoginInProgress(false);
	}

	/* async function handleFormSubmit(ev) {
		ev.preventDefault();
		setLoginInProgress(true);

		console.log('Form submitted with:', { email, password });

		const result = await signIn('credentials', {
			redirect: false, // prevent automatic redirect to the callbackUrl
			email,
			password,
			callbackUrl: '/',
		});

		console.log('signIn result:', result);

		setLoginInProgress(false);

		if (result.error) {
			console.error('Error logging in:', result.error);
		} else {
			console.log('User logged in successfully');
			window.location.href = result.url; // manually redirect if needed
		}
	} */

	return (
		<section className="mt-8">
			<h1 className="text-center text-primary text-4xl font-medium mb-4">
				Login
			</h1>

			<form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
				<input
					name="email"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(ev) => setEmail(ev.target.value)}
					disabled={loginInProgress}
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(ev) => setPassword(ev.target.value)}
					disabled={loginInProgress}
				/>
				<button type="submit" disabled={loginInProgress}>
					Sign In
				</button>
				<div className="my-4 text-center text-gray-500">You can also....</div>
				<button
					type="button"
					onClick={() => signIn('google', { callbackUrl: '/' })}
					className="flex gap-4 justify-center"
					disabled={loginInProgress}
				>
					<Image
						src={'/google.png'}
						alt="google-icon"
						width={24}
						height={24}
					></Image>
					Sign in with Google
				</button>
			</form>
		</section>
	);
}
