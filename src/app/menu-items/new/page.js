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

export default function NewMenuItemPage() {
	// State to check If user is Admin:
	const { loading, data } = useProfile();

	// Create state for menu image:
	const [image, setImage] = useState('');

	// State for the form inputs, in order to grab and update:
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [basePrice, setBasePrice] = useState('');
	// Create state to redirect inside function:
	const [redirectToItems, setRedirectToItems] = useState(false);

	// function to update form inputs:
	async function handleFormSubmit(ev) {
		ev.preventDefault();
		const data = { image, name, description, basePrice };
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

				<div className="max-w-md mx-auto mt-8">
					<Link className="button" href={'/menu-items'}>
						<Left />
						Show All Menu Items
					</Link>
				</div>

				<form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
					<div
						className="grid items-start gap-4"
						style={{ gridTemplateColumns: '.2fr .8fr' }}
					>
						<div>
							<EditableImage link={image} setLink={setImage} />
						</div>
						<div className="grow">
							<label>Item Name:</label>
							<input
								type="text"
								value={name}
								onChange={(ev) => setName(ev.target.value)}
							/>
							<label>Description:</label>
							<input
								type="text"
								value={description}
								onChange={(ev) => setDescription(ev.target.value)}
							/>
							<label>Base Price:</label>
							<input
								type="text"
								value={basePrice}
								onChange={(ev) => setBasePrice(ev.target.value)}
							/>
							<button type="submit">Save</button>
						</div>
					</div>
				</form>
			</section>
		</div>
	);
}
