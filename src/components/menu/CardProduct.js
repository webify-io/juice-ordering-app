import Image from 'next/image';
import { cartProductPrice } from '../AppContext';
import Trash from '../icons/Trash';

export default function CartProduct({ product, onRemove }) {
	return (
		<div className="flex items-center gap-4 border-b py-4">
			<div className="max-w-24 ">
				<Image
					src={product.image}
					className="w-16 h-16 object-contain"
					width={240}
					height={240}
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
			<div className="text-lg font-semibold">R{cartProductPrice(product)}</div>
			{!!onRemove && (
				<div className="ml-2">
					<button type="button" onClick={() => onRemove(index)} className="p-2">
						<Trash />
					</button>
				</div>
			)}
		</div>
	);
}
