export default function AddressInputs({ addressProps, setAddressProp }) {
	const { phone, streetAddress, postalCode, city, province } = addressProps;

	return (
		<>
			<label>Phone</label>
			<input
				type="tel"
				placeholder="Phone Number"
				value={phone}
				onChange={(ev) => setAddressProp('phone', ev.target.value)}
			/>
			<label>Street Address</label>
			<input
				type="text"
				placeholder="Street Address"
				value={streetAddress}
				onChange={(ev) => setAddressProp('streetAddress', ev.target.value)}
			/>
			<div className="flex gap-2">
				<div className="grow">
					<label>City</label>
					<input
						type="text"
						placeholder="City"
						value={city}
						onChange={(ev) => setAddressProp('city', ev.target.value)}
					/>
				</div>
				<div className="grow">
					<label>Postal Code</label>
					<input
						type="text"
						placeholder="Postal Code"
						value={postalCode}
						onChange={(ev) => setAddressProp('postalCode', ev.target.value)}
					/>
				</div>
			</div>
			<label>Province</label>
			<input
				type="text"
				placeholder="Province"
				value={province}
				onChange={(ev) => setAddressProp('province', ev.target.value)}
			/>
		</>
	);
}
