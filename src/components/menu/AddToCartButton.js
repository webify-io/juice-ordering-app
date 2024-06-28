/* import FlyingButton from 'react-flying-item'; */

import FlyingButton from '../flyingButton/FlyingButton';

export default function AddToCartButton({
	hasSizesOrExtras,
	onClick,
	basePrice,
	image,
}) {
	if (!hasSizesOrExtras) {
		return (
			<FlyingButton src={image}>
				<div onClick={onClick}>Add to Cart R{basePrice}</div>
			</FlyingButton>
		);
	}
	return (
		<button
			type="button"
			onClick={onClick}
			className="bg-primary text-white rounded-lg px-8 py-2  hover:bg-gray-700 transition-all"
		>
			<span>From R{basePrice}</span>
			{/* {hasSizesOrExtras ? (
				<span>From R{basePrice}</span>
			) : (
				<span>Add to Cart R{basePrice}</span>
			)} */}
		</button>
	);
}
