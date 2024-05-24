'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import ErrorBox from '../../components/layout/ErrorBox';
import toast from 'react-hot-toast';

export default function ProfilePage() {
	const session = useSession();
	const [userName, setUserName] = useState(' ');
	const [userLastName, setUserLastName] = useState('');
	// Add a new state variable for the error
	const [error, setError] = useState(null);
	// Set state for user image
	const [image, setImage] = useState('');
	// Set states for addy info
	const [phone, setPhone] = useState('');
	const [streetAddress, setStreetAddress] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');

	const { status } = session;
	console.log({ session });

	// useEffect running when something changes with the session or session status:
	useEffect(() => {
		if (status === 'authenticated') {
			setUserName(session.data.user.name || '');
			setImage(session.data.user.image);
			// fetch user info from db
			fetch('/api/profile').then((response) => {
				response.json().then((data) => {
					setUserLastName(data.surname);
					setPhone(data.phone);
					setStreetAddress(data.streetAddress);
					setCity(data.city);
					setPostalCode(data.postalCode);
					setProvince(data.province);
				});
			});
		}
	}, [session, status]);

	// Function for handleProfileInfoUpdate
	async function handleProfileInfoUpdate(ev) {
		ev.preventDefault();
		//setSaved(false);
		//setIsSaving(true);
		/* toast.loading('Saving...', {
			duration: 3000,
		}); */

		// Handle Fetch Errors:
		try {
			const savingPromise = new Promise(async (resolve, reject) => {
				const response = await fetch('/api/profile', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name: userName,
						surname: userLastName,
						image,
						phone,
						streetAddress,
						city,
						postalCode,
						province,
					}),
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

	// Function for handleFileChange
	async function handleFileChange(ev) {
		const files = ev.target.files;

		if (files?.length === 1) {
			const data = new FormData();
			data.set('file', files[0]);

			// Handle Fetch Errors:
			try {
				const uploadPromise = fetch('/api/upload', {
					method: 'POST',
					body: data,
				}).then(async (response) => {
					if (response.ok) {
						return response.json().then((link) => {
							setImage(link);
						});
					}
					throw new Error('Something went wrong.');
				});

				await toast.promise(uploadPromise, {
					loading: 'Uploading Image...',
					success: 'Image Updated.',
					error: "This didn't work.",
				});
			} catch (error) {
				console.error('Network error:', error);
				setError('Network error. Please try again later.');
				toast.error('Network error. Please try again later.');
			}
		}
	}
	// Clear the error state when the component unmounts
	useEffect(() => {
		return () => {
			setError(null);
		};
	}, []);

	/* async function handleFileChange(ev) {
		const files = ev.target.files;

		if (files?.length === 1) {
			const data = new FormData();
			data.set('file', files[0]);
			// set isUploading to true
			setIsUploading(true);
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: data,
			});
			const link = await response.json();
			// Set image to our link
			setImage(link);
			// set isUploading to false
			setIsUploading(false);
		}
		// Check for Errors in API Responses:
		if (!response.ok) {
			const errorData = await response.json();
			console.error('Error updating profile:', errorData);
			return;
		}
	} */

	if (status === 'loading') {
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
			<h1 className="text-center text-primary text-4xl font-medium mb-4">
				Profile
			</h1>

			<div className="max-w-md mx-auto">
				{error && <ErrorBox>{error}</ErrorBox>}

				<div className="flex gap-4">
					<div>
						<div className="bg-gray-100 p-2 rounded-md max-w-[120px] min-w-[120px]">
							{image && (
								<Image
									className="rounded-md w-full h-full mb-1"
									src={image}
									width={250}
									height={250}
									alt="avatar"
								></Image>
							)}
							<label className="cursor-pointer">
								<input
									type="file"
									className="hidden"
									onChange={handleFileChange}
								/>
								<span className="block border border-gray-300 rounded-sm p-2 text-center">
									Edit
								</span>
							</label>
						</div>
					</div>
					<form className="grow" onSubmit={handleProfileInfoUpdate}>
						<div className="flex gap-2">
							<div>
								<label>First Name</label>
								<input
									type="text"
									placeholder="First Name"
									value={userName}
									onChange={(ev) => setUserName(ev.target.value)}
								/>
							</div>
							<div>
								<label>Last Name</label>
								<input
									type="text"
									placeholder="Last Name"
									value={userLastName} // force the input's value to match the state variable
									onChange={(ev) => setUserLastName(ev.target.value)} // update the state variable on any edits
								/>
							</div>
						</div>

						<label>Email</label>
						<input
							type="email"
							value={session.data.user.email}
							disabled={true}
							placeholder="Email"
						/>
						<label>Phone</label>
						<input
							type="tel"
							placeholder="Phone Number"
							value={phone}
							onChange={(ev) => setPhone(ev.target.value)}
						/>
						<label>Street Address</label>
						<input
							type="text"
							placeholder="Street Address"
							value={streetAddress}
							onChange={(ev) => setStreetAddress(ev.target.value)}
						/>
						<div className="flex gap-2">
							<div>
								<label>City</label>
								<input
									type="text"
									placeholder="City"
									value={city}
									onChange={(ev) => setCity(ev.target.value)}
								/>
							</div>
							<div>
								<label>Postal Code</label>
								<input
									type="text"
									placeholder="Postal Code"
									value={postalCode}
									onChange={(ev) => setPostalCode(ev.target.value)}
								/>
							</div>
						</div>
						<label>Province</label>
						<input
							type="text"
							value={province}
							placeholder="Province"
							onChange={(ev) => setProvince(ev.target.value)}
						/>
						<button type="submit">Save</button>
					</form>
				</div>
			</div>
		</section>
	);
}
