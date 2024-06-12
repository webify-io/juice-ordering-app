'use client';

import { useEffect, useState } from 'react';
import useProfile from '../../components/UseProfile';
import UserTabs from '../../components/layout/UserTabs';
import Link from 'next/link';

export default function UsersPage() {
	const [users, setUsers] = useState([]);
	const { loading, data } = useProfile();

	useEffect(() => {
		fetch('/api/users').then((response) => {
			response.json().then((users) => {
				setUsers(users);
			});
		});
	}, []);

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
		<section className="max-w-2xl mx-auto mt-8">
			<UserTabs isAdmin={true} />

			<div className="mt-8">
				{users?.length > 0 &&
					users.map((user) => (
						<div className="flex bg-gray-200 rounded-md mb-2 p-1 px-4 items-center">
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
								<div className="text-gray-900">
									{!!user.name && <span>{user.name}</span>}
									{!user.name && <span className="italic">Name Unknown</span>}
								</div>
								<span className="text-gray-500">{user.email}</span>
							</div>
							<div>
								<Link className="button" href={'/users/' + user._id}>
									Edit
								</Link>
							</div>
						</div>
					))}
			</div>
		</section>
	);
}
