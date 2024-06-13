import { useContext, useState } from 'react';
import { CartContext } from '../AppContext';
import toast from 'react-hot-toast';
import MenuItemTile from './MenuItemTile';

export default function MenuItem(menuItem) {
	const { image, name, description, basePrice, sizes, extraIngredientPrices } =
		menuItem;
	const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
	const [selectedExtras, setSelectedExtras] = useState([]);
	const [showPopup, setShowPopup] = useState(false);
	const { addToCart } = useContext(CartContext);

	function handleAddToCartButtonClick() {
		// If we dont have any Options for the item, we just add to cart:
		const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;

		if (hasOptions && !showPopup) {
			setShowPopup(true);
			return;
		}
		addToCart(menuItem, selectedSize, selectedExtras);
		setShowPopup(false);
		setSelectedSize(null);
		toast.success('Added To Cart!');
	}

	function handleExtraThingClick(ev, extraThing) {
		const checked = ev.target.checked;

		if (checked) {
			setSelectedExtras((prev) => [...prev, extraThing]);
		} else {
			setSelectedExtras((prev) => {
				return prev.filter((e) => e.name !== extraThing.name);
			});
		}
	}

	let selectedPrice = basePrice;
	if (selectedSize) {
		selectedPrice += selectedSize.price;
	}
	if (selectedExtras?.length > 0) {
		for (const extra of selectedExtras) {
			selectedPrice += extra.price;
		}
	}

	return (
		<>
			{showPopup && (
				<div
					onClick={() => setShowPopup(false)}
					className="fixed inset-0 bg-black/70 flex items-center justify-center z-10"
				>
					<div
						onClick={(ev) => ev.stopPropagation()}
						className="bg-white py-2 rounded-lg  max-w-md max-h-full my-8"
					>
						<div
							className="overflow-y-scroll p-2"
							style={{ maxHeight: 'calc(100vh - 85px)' }}
						>
							<img
								src={image}
								alt={name}
								width={300}
								height={500}
								className="mx-auto max-w-24"
							/>
							<h2 className="text-xl font-semibold text-center my-2">{name}</h2>
							<p className="text-center text-gray-500 text-sm font-medium mb-2">
								{description}
							</p>

							{sizes?.length > 0 && (
								<div className="p-2">
									<h3 className="font-medium bg-gray-200 rounded-md p-2 mb-1">
										Select Size:
									</h3>
									{sizes.map((size) => (
										<label className="flex items-center gap-2 p-3 border rounded-md mb-1">
											<input
												type="radio"
												onClick={() => setSelectedSize(size)}
												checked={selectedSize?.name === size.name}
												name="size"
											/>
											{size.name} R{basePrice + size.price}
										</label>
									))}
								</div>
							)}

							{extraIngredientPrices?.length > 0 && (
								<div className="p-2">
									<h3 className="font-medium bg-gray-200 rounded-md p-2 mb-1">
										Select Your Fruit Mix:
									</h3>
									{extraIngredientPrices.map((extraThing) => (
										<label className="flex items-center gap-2 p-3 border rounded-md mb-1">
											<input
												type="checkbox"
												onClick={(ev) => handleExtraThingClick(ev, extraThing)}
												name={extraThing.name}
											/>
											{extraThing.name} + R{extraThing.price}
										</label>
									))}
								</div>
							)}

							<button
								className="primary sticky bottom-0"
								onClick={handleAddToCartButtonClick}
								type="button"
							>
								Add to Cart R{selectedPrice}
							</button>
							<button
								className="mt-2"
								onClick={() => {
									setShowPopup(false);
									setSelectedSize(null);
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			<MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
		</>
	);
}
