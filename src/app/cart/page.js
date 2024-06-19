'use client';

import { useContext, useEffect, useState } from 'react';
import SectionHeaders from '../../components/layout/SectionHeaders';
import { CartContext, cartProductPrice } from '../../components/AppContext';
import Trash from '../../components/icons/Trash';
import AddressInputs from '../../components/layout/AddressInputs';
import useProfile from '../../components/UseProfile';

export default function CartPage() {
	const { cartProducts, removeCartProduct } = useContext(CartContext);
	const [address, setAddress] = useState({});
	const { data: profileData } = useProfile();

	// To fill the checkout form automatically:
	useEffect(() => {
		if (profileData?.city) {
			const { phone, streetAddress, city, postalCode, province } = profileData;
			const addressFromProfile = {
				phone,
				streetAddress,
				city,
				postalCode,
				province,
			};

			setAddress(addressFromProfile);
		}
	}, [profileData]);

	let subTotal = 0;
	for (const p of cartProducts) {
		subTotal += cartProductPrice(p);
	}

	function handleAddressChange(propName, value) {
		setAddress((prevAddress) => {
			return { ...prevAddress, [propName]: value };
		});
	}

	// FUNCTION for Stripe checkout:
	async function proceedToCheckout(ev) {
		// grab address and shopping cart products:
		const response = await fetch('/api/checkout', {
			method: 'POST',
			headers: { 'Content-Type:': 'application/json' },
			body: JSON.stringify({
				address,
				cartProducts,
			}),
		});
		const link = await response.json();
		//redirect to stripe:
		window.location = link;
	}

	return (
		<section className="mt-8">
			<div className="text-center">
				<SectionHeaders mainHeader="Cart" />
			</div>
			<div className="mt-8 grid grid-cols-2 gap-8">
				<div>
					{cartProducts?.length === 0 && (
						<div className="text-center text-primary text-2xl mb-4 py-12">
							Your cart is empty.
						</div>
					)}
					{cartProducts?.length > 0 &&
						cartProducts.map((product, index) => (
							<div className="flex items-center gap-4 border-b py-4">
								<div className="max-w-24 ">
									<img
										src={product.image}
										className="w-16 h-16 object-contain"
										alt=""
									/>
								</div>
								<div className="grow">
									<h3 className="font-semibold">{product.name}</h3>
									{product.size && (
										<div className="text-sm ">
											Size:
											<span> {product.size.name}</span>
										</div>
									)}
									{product.extras?.length > 0 && (
										<div className="text-sm text-gray-500">
											{product.extras.map((extra) => (
												<div>
													{extra.name} R{extra.price}
												</div>
											))}
										</div>
									)}
								</div>
								<div className="text-lg font-semibold">
									R{cartProductPrice(product)}
								</div>
								<div className="ml-2">
									<button
										type="button"
										onClick={() => removeCartProduct(index)}
										className="p-2"
									>
										<Trash />
									</button>
								</div>
							</div>
						))}

					<div className="flex justify-end items-center py-2  pr-16">
						<div className="text-gray-500">
							Subtotal: <br />
							Delivery Fee: <br />
							Total:
						</div>
						<div className="text-lg font-semibold pl-2 text-right">
							R{subTotal} <br />
							R60 <br />
							{subTotal + 60}
						</div>
					</div>
				</div>

				<div className="bg-gray-100 p-4 rounded-lg m-10">
					<h2>Checkout:</h2>
					<form onSubmit={proceedToCheckout}>
						<AddressInputs
							addressProps={address}
							setAddressProp={handleAddressChange}
						/>
						<button type="submit">Pay R{subTotal}</button>
					</form>
				</div>
			</div>
		</section>
	);
}
