'use client';

import { useEffect, useState } from 'react';
import UserTabs from '../../components/layout/UserTabs';
import useProfile from '../../components/UseProfile';
import toast from 'react-hot-toast';
import DeleteButton from '../../components/DeleteButton';

export default function CategoriesPage() {
	// Use UseProfile.js Hook:
	const { loading: profileLoading, data: profileData } = useProfile();
	// State for [New Category Name] input:
	const [categoryName, setCategoryName] = useState();
	// Create State to edit category:
	const [editedCategory, setEditedCategory] = useState(null);

	// Grab all our Categories from the DB, when the page loads it will run fetch(), to fetch all the categories:
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		fetchCategories();
	}, []);

	//function to fetch Categories:
	function fetchCategories() {
		fetch('/api/categories').then((res) => {
			res.json().then((categories) => {
				setCategories(categories);
			});
		});
	}

	// Create handleCategorySubmit():
	async function handleCategorySubmit(ev) {
		ev.preventDefault();
		// Create a toast for the fecth response:
		const creationPromise = new Promise(async (resolve, reject) => {
			const data = { name: categoryName };
			if (editedCategory) {
				data._id = editedCategory._id;
			}
			const response = await fetch('/api/categories', {
				method: editedCategory ? 'PUT' : 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			// to check and refresh Category list:
			setCategoryName('');
			fetchCategories();
			setEditedCategory(null);

			if (response.ok) {
				resolve();
			} else {
				reject();
			}
		});
		await toast.promise(creationPromise, {
			loading: editedCategory
				? 'Updating Category...'
				: 'Saving New Category...',
			success: editedCategory ? 'Category Updated.' : 'Category Saved.',
			error: 'Error Saving!',
		});
	}

	// Function to handle Delete btn:
	async function handleDeleteClick(_id) {
		const promise = new Promise(async (resolve, reject) => {
			const response = await fetch('/api/categories?_id=' + _id, {
				method: 'DELETE',
			});
			if (response.ok) {
				resolve();
			} else {
				reject();
			}
		});

		await toast.promise(promise, {
			loading: 'Deleting Category...',
			success: 'Deleted Category.',
			error: 'Error',
		});

		// Refresh Categories:
		fetchCategories();
	}

	// When admin UserPofile.js is Loading:
	if (profileLoading) {
		return (
			<section className="mt-8">
				<h1 className="text-center text-primary text-2xl mb-4 py-12">
					Loading Category Info...
				</h1>
			</section>
		);
	}

	if (!profileData.admin) {
		return (
			<section className="mt-8">
				<h1 className="text-center text-primary text-2xl mb-4 py-12">
					Unauthorised Access
				</h1>
			</section>
		);
	}

	return (
		<section className="mt-8 max-w-2xl mx-auto">
			<UserTabs isAdmin={true} />
			<form className="mt-8" onSubmit={handleCategorySubmit}>
				<label>
					{editedCategory ? 'Update Category' : 'New Category Name'}
					{editedCategory && (
						<>
							: <b>{editedCategory.name}</b>
						</>
					)}
				</label>
				<div className="flex gap-2">
					<div className="grow">
						<input
							type="text"
							value={categoryName}
							onChange={(ev) => setCategoryName(ev.target.value)}
						/>
					</div>
					<div className="flex gap-2 pb-2">
						<button className="border border-primary" type="submit">
							{editedCategory ? 'Update' : 'Create'}
						</button>
						<button
							type="button"
							onClick={() => {
								setEditedCategory(null);
								setCategoryName('');
							}}
						>
							Cancel
						</button>
					</div>
				</div>
			</form>

			{/* Display the Category added: */}
			<div>
				<h2 className="text-gray-500 text-sm font-medium mt-8">
					Existing Category:
				</h2>
				{categories?.length > 0 &&
					categories.map((c) => (
						<div
							key={c._id}
							className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
						>
							<div className="grow ">{c.name}</div>
							<div className="flex gap-1">
								<button
									type="button"
									onClick={() => {
										setEditedCategory(c);
										setCategoryName(c.name);
									}}
								>
									Edit
								</button>
								<DeleteButton
									label="Delete"
									onDelete={() => handleDeleteClick(c._id)}
								/>
							</div>
						</div>
					))}
			</div>
		</section>
	);
}
