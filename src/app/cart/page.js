'use client';

import { useContext, useEffect, useState } from 'react';
import SectionHeaders from '../../components/layout/SectionHeaders';
import { CartContext, cartProductPrice } from '../../components/AppContext';
import Trash from '../../components/icons/Trash';
import AddressInputs from '../../components/layout/AddressInputs';
import useProfile from '../../components/UseProfile';
import toast from 'react-hot-toast';
import CartProduct from '../../components/menu/CardProduct';

export default function CartPage() {
	const { cartProducts, removeCartProduct } = useContext(CartContext);
	const [address, setAddress] = useState({});
	const { data: profileData } = useProfile();

	useEffect(() => {
		if (window.location.href.includes('canceled=1')) {
			toast.error('Payment Failed 😢');
		}
	}, []);

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
		ev.preventDefault();
		// grab address and shopping cart products:
		const promise = new Promise((resolve, reject) => {
			fetch('/api/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					address,
					cartProducts,
				}),
			}).then(async (response) => {
				if (response.ok) {
					resolve();
					//redirect to stripe:
					window.location = await response.json();
				} else {
					reject();
				}
			});
		});

		await toast.promise(promise, {
			loading: 'Preparing your order...',
			success: 'Redirecting to payment...',
			error: 'Something went wrong... Please try again later.',
		});
	}

	// If cartProducts() has been paid for or is empty:
	if (cartProducts?.length === 0) {
		return (
			<section className="mt-8 text-center">
				<SectionHeaders mainHeader="Cart" />
				<div className="text-center text-gray-500 text-2xl mt-4 py-12">
					Your Shopping Cart is empty. 😭
				</div>
			</section>
		);
	}

	return (
		<section className="mt-8">
			<div className="text-center">
				<SectionHeaders mainHeader="Cart" />
			</div>
			<div className="mt-8 grid md:grid-cols-2 md:gap-8">
				<div>
					{cartProducts?.length === 0 && (
						<div className="text-center text-primary text-2xl mb-4 py-12">
							Your cart is empty.
						</div>
					)}
					{cartProducts?.length > 0 &&
						cartProducts.map((product, index) => (
							<CartProduct
								key={index}
								product={product}
								index={index}
								onRemove={removeCartProduct}
							/>
						))}

					<div className="flex justify-end items-center py-2  pr-16">
						<div className="text-gray-500">
							Subtotal: <br />
							Delivery Fee: <br />
							Total:
						</div>
						<div className="font-semibold pl-2 text-right">
							R{subTotal} <br />
							<span className="text-gray-500">R120</span> <br />R
							{subTotal + 120}
						</div>
					</div>
				</div>

				<div className="bg-gray-100 p-4 rounded-lg md:m-10">
					<h2 className="font-semibold">Checkout:</h2>
					<form onSubmit={proceedToCheckout}>
						<AddressInputs
							addressProps={address}
							setAddressProp={handleAddressChange}
						/>
						<button type="submit">Pay R{subTotal + 120}</button>
					</form>
				</div>
			</div>
		</section>
	);
}
