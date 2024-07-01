'use client';

import { useEffect, useState } from 'react';
import SectionHeaders from '../../components/layout/SectionHeaders';
import UserTabs from '../../components/layout/UserTabs';
import useProfile from '../../components/UseProfile';
import { dbTimeForHumans } from '../../libs/datetime';
import Link from 'next/link';

export default function OrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loadingOrders, setLoadingOrders] = useState(true);
	const { loading, data: profile } = useProfile();

	useEffect(() => {
		fetchOrders();
	}, []);

	function fetchOrders() {
		setLoadingOrders(true);
		fetch('/api/orders').then((res) => {
			res.json().then((orders) => {
				setOrders(orders.reverse());
				setLoadingOrders(false);
			});
		});
	}

	return (
		<section className="mt-8 max-w-2xl mx-auto">
			<UserTabs isAdmin={profile.admin} />

			<div className="mt-8">
				{loadingOrders && (
					<section className="mt-8">
						<h1 className="text-center text-primary text-2xl mb-4 py-12">
							Loading Orders...
						</h1>
					</section>
				)}

				{orders?.length > 0 &&
					orders.map((order) => (
						<div
							key={order._id}
							className="flex flex-col md:flex-row gap-6 items-center bg-gray-200 mb-2 p-4 rounded-lg"
						>
							<div className="flex grow flex-col md:flex-row items-center gap-6">
								<div
									className={
										(order.paid ? 'bg-green-500' : 'bg-red-400') +
										' p-2 rounded-md text-white whitespace-nowrap w-20 text-center'
									}
								>
									{order.paid ? 'Paid' : 'Not Paid'}
								</div>

								<div className="text-sm grow">
									<div className="md:flex gap-2 items-center mb-1">
										<div className="font-medium grow">{order.userEmail}</div>
										<div>{dbTimeForHumans(order.createdAt)}</div>
									</div>

									<div className="text-gray-500 text-xs">
										<div className="md:flex">
											<div className="grow">
												{order.cartProducts.map((p) => p.name).join(', ')}
											</div>
											<div>Items: {order.cartProducts?.length}</div>
										</div>
									</div>
								</div>
							</div>

							<div className="whitespace-nowrap w-28">
								<Link
									href={'/orders/' + order._id}
									className="button bg-gray-300 hover:bg-slate-100"
								>
									Show Order
								</Link>
							</div>
						</div>
					))}
			</div>
		</section>
	);
}
