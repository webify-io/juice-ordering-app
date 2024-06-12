'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import ErrorBox from '../../components/layout/ErrorBox';
import toast from 'react-hot-toast';
import UserTabs from '../../components/layout/UserTabs';
import UserForm from '../../components/layout/UserForm';

export default function ProfilePage() {
	const session = useSession();

	const [user, setUser] = useState(null);
	// Add a new state variable for the error
	const [error, setError] = useState(null);

	const [isAdmin, setIsAdmin] = useState(false);
	// state when toggling adminTabs
	const [profileFetched, setProfileFetched] = useState(false);

	const { status } = session;

	// useEffect running when something changes with the session or session status:
	useEffect(() => {
		if (status === 'authenticated') {
			// fetch user info from db
			fetch('/api/profile').then((response) => {
				response.json().then((data) => {
					setUser(data);
					setIsAdmin(data.admin);
					setProfileFetched(true);
				});
			});
		}
	}, [session, status]);

	// Function for handleProfileInfoUpdate
	async function handleProfileInfoUpdate(ev, data) {
		ev.preventDefault();
		// Handle Fetch Errors:
		try {
			const savingPromise = new Promise(async (resolve, reject) => {
				const response = await fetch('/api/profile', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				});
				if (response.ok) resolve();
				else reject();
			});

			await toast.promise(savingPromise, {
				loading: 'Saving...',
				success: 'Profile Saved.',
				error: 'Error Saving!',
			});
		} catch (error) {
			console.error('Network error:', error);
			setError.error('Network error. Please try again later.');
		}
	}

	// Clear the error state when the component unmounts
	useEffect(() => {
		return () => {
			setError(null);
		};
	}, []);

	if (status === 'loading' || !profileFetched) {
		return (
			<section className="mt-8">
				<h1 className="text-center text-primary text-2xl mb-4 py-12">
					Loading...
				</h1>
			</section>
		);
	}

	if (status === 'unauthenticated') {
		redirect('/login');
	}

	return (
		<section className="mt-8">
			<UserTabs isAdmin={isAdmin} />

			<div className="max-w-2xl mx-auto mt-8">
				{error && <ErrorBox>{error}</ErrorBox>}

				<UserForm user={user} onSave={handleProfileInfoUpdate} />
			</div>
		</section>
	);
}
