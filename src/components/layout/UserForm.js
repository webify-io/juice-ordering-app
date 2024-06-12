'use client';

import { useState } from 'react';
import EditableImage from '../../components/layout/EditableImage';
import useProfile from '../UseProfile';

export default function UserForm({ user, onSave }) {
	const [userName, setUserName] = useState(user?.name || '');
	const [userLastName, setUserLastName] = useState(user?.surname || '');
	// Set state for user image
	const [image, setImage] = useState(user?.image || '');
	// Set states for addy info
	const [phone, setPhone] = useState(user?.phone || '');
	const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
	const [postalCode, setPostalCode] = useState(user?.postalCode || '');
	const [city, setCity] = useState(user?.city || '');
	const [province, setProvince] = useState(user?.province || '');
	const [admin, setAdmin] = useState(user?.admin || false);
	const { data: loggedInUserData } = useProfile();

	return (
		<div className="flex gap-4">
			<div>
				<div className="bg-gray-100 p-2 rounded-md max-w-[120px] min-w-[120px]">
					<EditableImage link={image} setLink={setImage} />
				</div>
			</div>
			<form
				className="grow"
				onSubmit={(ev) =>
					onSave(ev, {
						name: userName,
						surname: userLastName,
						image,
						phone,
						streetAddress,
						postalCode,
						city,
						province,
						admin,
					})
				}
			>
				<div className="grid grid-cols-2 gap-2 ">
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
					value={user.email}
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

				{loggedInUserData.admin && (
					<div>
						<label
							className="inline-flex gap-2 items-center p-2  mb-2"
							htmlFor="adminCb"
						>
							<input
								id="adminCb"
								type="checkbox"
								value={'1'}
								checked={admin}
								onClick={(ev) => setAdmin(ev.target.checked)}
							/>
							<span>Admin</span>
						</label>
					</div>
				)}

				<button type="submit">Save</button>
			</form>
		</div>
	);
}
