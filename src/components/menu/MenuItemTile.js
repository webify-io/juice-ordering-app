import AddToCartButton from './AddToCartButton';

export default function MenuItemTile({ onAddToCart, ...item }) {
	const { image, description, name, basePrice, sizes, extraIngredientPrices } =
		item;
	const hasSizesOrExtras =
		sizes?.length > 0 || extraIngredientPrices?.length > 0;

	return (
		<div className="flex flex-col justify-between items-center bg-gray-200 opacity-90 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
			<div className="flex justify-center items-center">
				<img
					src={image}
					alt="juice"
					className="max-w-auto max-h-28 object-contain transform hover:scale-125 transition-transform duration-500"
					/* className="w-32 h-32 object-contain" */
				/>
			</div>
			<div className="mb-4">
				<h4 className="font-semibold text-xl my-3">{name}</h4>
				<p className="text-gray-500 text-sm line-clamp-3">{description}</p>
			</div>
			<div className="mt-auto">
				<AddToCartButton
					image={image}
					hasSizesOrExtras={hasSizesOrExtras}
					onClick={onAddToCart}
					basePrice={basePrice}
				/>
			</div>
		</div>
	);
}
