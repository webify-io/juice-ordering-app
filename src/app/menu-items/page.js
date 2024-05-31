'use client';

import Link from 'next/link';
import useProfile from '../../components/UseProfile';
import UserTabs from '../../components/layout/UserTabs';
import Right from '../../components/icons/Right';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function MenuItemsPage() {
	// State to check If user is Admin:
	const { loading, data } = useProfile();
	// State to save fetch('/api/menu-items') to State:
	const [menuItems, setMenuItems] = useState([]);

	// To list all items added from '/menu-items/new':
	useEffect(() => {
		fetch('/api/menu-items').then((res) => {
			res.json().then((menuItems) => {
				setMenuItems(menuItems);
			});
		});
	}, []);

	// Check If user is Admin:
	if (loading) {
		return (
			<section className="mt-8">
				<h1 className="text-center text-primary text-2xl mb-4 py-12">
					Loading User Info...
				</h1>
			</section>
		);
	}

	if (!data.admin) {
		return (
			<section className="mt-8">
				<h1 className="text-center text-primary text-2xl mb-4 py-12">
					Not an Admin.
				</h1>
			</section>
		);
	}

	return (
		<section className="mt-8 max-w-md mx-auto">
			<UserTabs isAdmin={true} />

			<div className="mt-8">
				<Link className="button" href={'/menu-items/new'}>
					Create New Menu Item
					<Right />
				</Link>
			</div>

			<div>
				<h2 className="text-sm font-medium text-gray-500 mt-8">
					Edit Menu Item:{' '}
				</h2>

				{menuItems?.length > 0 &&
					menuItems.map((item) => (
						<Link className="button mb-1" href={'/menu-items/edit/' + item._id}>
							<div className="relative w-12">
								<Image src={item.image} alt="" width={100} height={100} />
							</div>
							{item.name}
						</Link>
					))}
			</div>
		</section>
	);
}
