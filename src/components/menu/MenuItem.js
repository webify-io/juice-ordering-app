export default function MenuItem() {
	return (
		<div className="bg-gray-200 opacity-90 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
			<div className="flex justify-center items-center">
				<img
					src="/strawberry-energy-juice.png"
					alt="juice"
					className="max-w-auto max-h-28 object-contain transform hover:scale-125 transition-transform duration-500"
					/* className="w-32 h-32 object-contain" */
				/>
			</div>
			<h4 className="font-semibold text-xl my-3">Strawberry Juice</h4>
			<p className="text-gray-500 text-sm">
				Refresh your body, rejuvenate your spirit, and revel in the tatse of
				wellness with every drop.
			</p>
			<button className="bg-primary text-white rounded-lg px-8 py-2 mt-4">
				Add to Cart R45
			</button>
		</div>
	);
}
