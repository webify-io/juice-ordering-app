'use client';

import { useEffect, useState } from 'react';
import UserTabs from '../../../../components/layout/UserTabs';
import toast from 'react-hot-toast';
import useProfile from '../../../../components/UseProfile';
import Link from 'next/link';
import Left from '../../../../components/icons/Left';
import { redirect, useParams } from 'next/navigation';
import MenuItemForm from '../../../../components/layout/MenuItemForm';
import DeleteButton from '../../../../components/DeleteButton';

export default function EditMenuItemPage() {
	// State to check If user is Admin:
	const { loading, data } = useProfile();
	// Create state to redirect inside function:
	const [redirectToItems, setRedirectToItems] = useState(false);
	// State to find a specific item with ID:
	const { id } = useParams();
	// State for MenuItemForm.js inputs:
	const [menuItem, setMenuItems] = useState(null);

	// fetch useEffect function to fetch the info of the menu-item:
	useEffect(() => {
		fetch('/api/menu-items').then((res) => {
			res.json().then((items) => {
				const item = items.find((i) => i._id === id);
				setMenuItems(item);
			});
		});
	}, []);

	// function to update form inputs:
	async function handleFormSubmit(ev, data) {
		ev.preventDefault();
		data = { ...data, _id: id };
		const savingPromise = new Promise(async (resolve, reject) => {
			const response = await fetch('/api/menu-items', {
				method: 'PUT',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.ok) resolve();
			else reject();
		});

		await toast.promise(savingPromise, {
			loading: 'Updating Menu Item...',
			success: 'Updated Menu Item.',
			error: 'Error!',
		});

		// Redirect to Menu-item list:
		setRedirectToItems(true);
	}

	// Function to Delete Menu Items:
	async function handleDeleteClick() {
		const promise = new Promise(async (resolve, reject) => {
			const res = await fetch('/api/menu-items?_id=' + id, {
				method: 'DELETE',
			});
			if (res.ok) resolve();
			else reject();
		});

		await toast.promise(promise, {
			loading: 'Deleting Menu Item...',
			success: 'Deleted Menu Item.',
			error: 'Error Deleting Menu Item!',
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
					Loading Menu Item Info...
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
				<MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
				<div className="max-w-md mx-auto mt-2">
					<div className=" max-w-sm ml-auto md:pl-9">
						<DeleteButton
							label="Delete Menu Item"
							onDelete={handleDeleteClick}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
