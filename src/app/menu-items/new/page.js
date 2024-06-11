'use client';

import { useState } from 'react';
import EditableImage from '../../../components/layout/EditableImage';
import UserTabs from '../../../components/layout/UserTabs';
import toast from 'react-hot-toast';
import useProfile from '../../../components/UseProfile';
import Link from 'next/link';
import Right from '../../../components/icons/Right';
import Left from '../../../components/icons/Left';
import { redirect } from 'next/navigation';
import MenuItemForm from '../../../components/layout/MenuItemForm';

export default function NewMenuItemPage() {
	// State to check If user is Admin:
	const { loading, data } = useProfile();
	// Create state to redirect inside function:
	const [redirectToItems, setRedirectToItems] = useState(false);

	// function to update form inputs:
	async function handleFormSubmit(ev, data) {
		ev.preventDefault();
		const savingPromise = new Promise(async (resolve, reject) => {
			const response = await fetch('/api/menu-items', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.ok) resolve();
			else reject();
		});

		await toast.promise(savingPromise, {
			loading: 'Saving Menu Item...',
			success: 'Saved New Menu Item.',
			error: 'Error!',
		});

		// Redirect to Menu-item list:
		setRedirectToItems(true);
	}

	if (redirectToItems) {
		return redirect('/menu-items');
	}

	// Check If user is Admin:
	if (loading) {
		return (
			<section className="mt-8">
				<h1 className="text-center text-primary text-2xl mb-4 py-12">
					Loading User Info...
				</h1>
			</section>
		);
	}

	if (!data.admin) {
		return (
			<section className="mt-8">
				<h1 className="text-center text-primary text-2xl mb-4 py-12">
					Not an Admin.
				</h1>
			</section>
		);
	}

	return (
		<div>
			<section className="mt-8">
				<UserTabs isAdmin={true} />

				<div className="max-w-2xl mx-auto mt-8">
					<Link className="button" href={'/menu-items'}>
						<Left />
						Show All Menu Items
					</Link>
				</div>

				<MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
			</section>
		</div>
	);
}
