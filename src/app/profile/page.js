'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import ErrorBox from '../../components/layout/ErrorBox';
import toast from 'react-hot-toast';
import UserTabs from '../../components/layout/UserTabs';
import EditableImage from '../../components/layout/EditableImage';

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
	const [isAdmin, setIsAdmin] = useState(false);
	// state when toggling adminTabs
	const [profileFetched, setProfileFetched] = useState(false);

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
					setIsAdmin(data.admin);
					setProfileFetched(true);
				});
			});
		}
	}, [session, status]);

	// Function for handleProfileInfoUpdate
	async function handleProfileInfoUpdate(ev) {
		ev.preventDefault();
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

				<div className="flex gap-4">
					<div>
						<div className="bg-gray-100 p-2 rounded-md max-w-[120px] min-w-[120px]">
							<EditableImage link={image} setLink={setImage} />
						</div>
					</div>
					<form className="grow" onSubmit={handleProfileInfoUpdate}>
						<div className="flex gap-2 ">
							<div className="grow">
								<label>First Name</label>
								<input
									type="text"
									placeholder="First Name"
									value={userName}
									onChange={(ev) => setUserName(ev.target.value)}
								/>
							</div>
							<div className="grow">
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
							<div className="grow">
								<label>City</label>
								<input
									type="text"
									placeholder="City"
									value={city}
									onChange={(ev) => setCity(ev.target.value)}
								/>
							</div>
							<div className="grow">
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
