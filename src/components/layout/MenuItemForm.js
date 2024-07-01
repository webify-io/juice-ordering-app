import { useEffect, useState } from 'react';
import EditableImage from './EditableImage';
import MenuItemPriceProps from './MenuItemPriceProps';

export default function MenuItemForm({ onSubmit, menuItem }) {
	const [image, setImage] = useState(menuItem?.image || '');
	const [name, setName] = useState(menuItem?.name || '');
	const [description, setDescription] = useState(menuItem?.description || '');
	const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
	const [sizes, setSizes] = useState(menuItem?.sizes || []);
	const [category, setCategory] = useState(menuItem?.category || '');
	const [categories, setCategories] = useState([]);
	const [extraIngredientPrices, setExtraIngredientPrices] = useState(
		menuItem?.extraIngredientPrices || []
	);

	useEffect(() => {
		fetch('/api/categories').then((res) => {
			res.json().then((categories) => {
				setCategories(categories);
			});
		});
	}, []);

	return (
		<form
			onSubmit={(ev) =>
				onSubmit(ev, {
					image,
					name,
					description,
					basePrice,
					sizes,
					extraIngredientPrices,
					category,
				})
			}
			className="mt-8 max-w-2xl mx-auto"
		>
			<div
				className="md:grid items-start gap-4"
				style={{ gridTemplateColumns: '.2fr .8fr' }}
			>
				<div>
					<EditableImage link={image} setLink={setImage} />
				</div>
				<div className="grow mt-2">
					<label>Item Name:</label>
					<input
						type="text"
						value={name}
						onChange={(ev) => setName(ev.target.value)}
					/>
					<label>Description:</label>
					<input
						type="text"
						value={description}
						onChange={(ev) => setDescription(ev.target.value)}
					/>
					<label>Base Price:</label>
					<input
						type="text"
						value={basePrice}
						onChange={(ev) => setBasePrice(ev.target.value)}
					/>

					<label>Category:</label>
					<select
						value={category}
						onChange={(ev) => setCategory(ev.target.value)}
					>
						{categories?.length > 0 &&
							categories.map((c) => (
								<option key={c._id} value={c._id}>
									{c.name}
								</option>
							))}
					</select>

					<MenuItemPriceProps
						name={'Sizes'}
						addLabel={'Add Item Size'}
						props={sizes}
						setProps={setSizes}
					/>

					<MenuItemPriceProps
						name={'Ingredients'}
						addLabel={'Add Extra Ingredients'}
						props={extraIngredientPrices}
						setProps={setExtraIngredientPrices}
					/>

					<button type="submit">Save</button>
				</div>
			</div>
		</form>
	);
}
