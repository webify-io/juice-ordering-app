import { useState } from 'react';
import ChevronDown from '../icons/ChevronDown';
import Plus from '../icons/Plus';
import Trash from '../icons/Trash';
import ChevronUp from '../icons/ChevronUp';

export default function MenuItemPriceProps({
	name,
	addLabel,
	props,
	setProps,
}) {
	const [isOpen, setIsOpen] = useState(false);

	function addProp() {
		setProps((oldProps) => {
			return [...oldProps, { name: '', price: 0 }];
		});
	}

	// define editSize() function:
	function editProp(ev, index, prop) {
		const newValue = ev.target.value;
		setProps((prevSizes) => {
			const newSizes = [...prevSizes];
			newSizes[index][prop] = newValue;
			return newSizes;
		});
	}

	// function to remove size on the close button for 'Add Item Size':
	function removeProp(indexToRemove) {
		setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
	}

	return (
		<div className="bg-gray-200 p-2 rounded-md mb-2">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="inline-flex justify-start p-1 border-0"
				type="button"
			>
				{isOpen && <ChevronUp />}

				{!isOpen && <ChevronDown />}

				<div className="flex gap-1 text-gray-700 text-sm font-bold">
					<span>{name}</span>
					<span>({props?.length})</span>
				</div>
			</button>

			<div className={isOpen ? 'block' : 'hidden'}>
				{props?.length > 0 &&
					props.map((size, index) => (
						<div key={index} className="flex items-end gap-2">
							<div>
								<label>Name</label>
								<input
									type="text"
									placeholder="Size Name"
									value={size.name}
									onChange={(ev) => editProp(ev, index, 'name')}
								/>
							</div>
							<div>
								<label>Extra Price</label>
								<input
									type="text"
									placeholder="Extra Price"
									value={size.price}
									onChange={(ev) => editProp(ev, index, 'price')}
								/>
							</div>
							<div>
								<button
									type="button"
									onClick={() => removeProp(index)}
									className="bg-white mb-2 px-2"
								>
									<Trash />
								</button>
							</div>
						</div>
					))}
				<button type="button" onClick={addProp} className="bg-white">
					<Plus className="size-5" />
					<span>{addLabel}</span>
				</button>
			</div>
		</div>
	);
}
