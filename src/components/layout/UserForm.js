'use client';

import { useState } from 'react';
import EditableImage from '../../components/layout/EditableImage';
import useProfile from '../UseProfile';
import AddressInputs from './AddressInputs';

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

	function handleAddressChange(propName, value) {
		if (propName === 'phone') setPhone(value);
		if (propName === 'streetAddress') setStreetAddress(value);
		if (propName === 'postalCode') setPostalCode(value);
		if (propName === 'city') setCity(value);
		if (propName === 'province') setProvince(value);
	}

	return (
		<div className="md:flex gap-4">
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

				<AddressInputs
					addressProps={{
						phone,
						streetAddress,
						city,
						province,
						postalCode,
					}}
					setAddressProp={handleAddressChange}
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
								onChange={(ev) => setAdmin(ev.target.checked)}
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
