'use client';

import { useEffect, useState } from 'react';
import useProfile from '../../../components/UseProfile';
import UserForm from '../../../components/layout/UserForm';
import UserTabs from '../../../components/layout/UserTabs';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditUserPage() {
	const { loading, data } = useProfile();
	const { id } = useParams();
	const [user, setUser] = useState(null);

	// useEffect to fetch Users:
	useEffect(() => {
		fetch('/api/profile?_id=' + id).then((res) => {
			res.json().then((user) => {
				setUser(user);
			});
		});
	}, []);

	// handleSaveButtonClick function for updating user profile:
	async function handleSaveButtonClick(ev, data) {
		ev.preventDefault();
		const promise = new Promise(async (resolve, reject) => {
			const res = await fetch('/api/profile', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...data, _id: id }),
			});
			if (res.ok) resolve();
			else reject();
		});
		await toast.promise(promise, {
			loading: 'Updating User...',
			success: 'User Profile Updated.',
			error: 'An Error Occurred While Saving User.',
		});
	}

	// When admin UserPofile.js is Loading:
	if (loading) {
		return (
			<section className="mt-8">
				<h1 className="text-center text-primary text-2xl mb-4 py-12">
					Loading User Info...
				</h1>
			</section>
		);
	}
	// When returns !admin from UserPofile.js:
	if (!data.admin) {
		return (
			<section className="mt-8">
				<h1 className="text-center text-primary text-2xl mb-4 py-12">
					Unauthorised Access
				</h1>
			</section>
		);
	}

	return (
		<section className="mt-8 mx-w-2xl mx-auto">
			<UserTabs isAdmin={true} />

			<div className="mt-8">
				<UserForm user={user} onSave={handleSaveButtonClick} />
			</div>
		</section>
	);
}
