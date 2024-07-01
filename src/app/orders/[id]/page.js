'use client';

import { useContext, useEffect, useState } from 'react';
import SectionHeaders from '../../../components/layout/SectionHeaders';
import { CartContext, cartProductPrice } from '../../../components/AppContext';
import { useParams } from 'next/navigation';
import AddressInputs from '../../../components/layout/AddressInputs';
import CartProduct from '../../../components/menu/CardProduct';

export default function OrderPage() {
	const { clearCart } = useContext(CartContext);
	const [order, setOrder] = useState();
	const [loadingOrder, setLoadingOrder] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		if (typeof window.console !== 'undefined') {
			if (window.location.href.includes('clear-cart=1')) {
				clearCart();
			}
		}
		if (id) {
			setLoadingOrder(true);
			fetch('/api/orders?_id=' + id).then((res) => {
				res.json().then((orderData) => {
					setOrder(orderData);
					setLoadingOrder(false);
				});
			});
		}
	}, []);

	let subtotal = 0;
	if (order?.cartProducts) {
		for (const product of order?.cartProducts) {
			subtotal += cartProductPrice(product);
		}
	}

	return (
		<section className="max-w-2xl mx-auto mt-8 ">
			<div className="text-center ">
				<SectionHeaders mainHeader="Your Order" />
				<div className="mt-8 mb-12 text-primary text-2xl ">
					<p>Thanks for your order.</p>
					<p>We will call you when your order is on the way.</p>
				</div>
			</div>

			{loadingOrder && (
				<section className="mt-8">
					<h1 className="text-center text-primary text-2xl mb-4 py-12">
						Loading Order Info...
					</h1>
				</section>
			)}

			{order && (
				<div className="grid md:grid-cols-2 md:gap-16">
					<div>
						{order.cartProducts.map((product) => (
							<CartProduct key={product._id} product={product} />
						))}
						<div className="text-right py-2 text-gray-500">
							Subtotal:
							<span className="text-black font-bold inline-block w-14">
								R{subtotal}
							</span>
							<br />
							Delivery:
							<span className="text-black font-bold inline-block w-14">
								R120
							</span>
							<br />
							Total:
							<span className="text-black font-bold inline-block w-14">
								R{subtotal + 120}
							</span>
							<br />
						</div>
					</div>
					<div>
						<div className="bg-gray-100 p-4 rounded-lg">
							<AddressInputs disabled={true} addressProps={order} />
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
