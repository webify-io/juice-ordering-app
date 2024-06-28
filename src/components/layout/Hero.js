import Image from 'next/image';
import Right from '../icons/Right';

export default function Hero() {
	return (
		<section className="hero">
			<div className="py-12">
				<h1 className="text-4xl font-semibold">
					Squeeze the Day with Nature's{' '}
					<span className="text-primary">Essence</span>
				</h1>
				<p className="my-6 text-gray-500 text-sm">
					Discover the pure, unadulterated joy of sipping on health with our
					range of all-natural fruit juices.
					<br />
					<br />
					Each bottle is a vibrant blend of the finest fruits, handpicked at
					peak ripeness, and cold-pressed to perfection. No added sugars, no
					preservatives - just the wholesome goodness of nature in every gulp.
					<br />
					<br />
					Refresh your body, rejuvenate your spirit, and revel in the tatse of
					wellness with every drop.
					<br />
					<br />
					<b>Embrace Vitality</b> - one sip at a time.
				</p>

				<div className="flex gap-4 text-sm">
					<button className="flex justify-center items-center bg-primary uppercase gap-x-2 text-white px-4 py-2 rounded-lg ">
						Order Now
						<Right />
					</button>

					<button className="flex items-center border-0 gap-x-2 text-gray-600 font-semibold px-2 py-2">
						Learn More
						<Right />
					</button>
				</div>
			</div>

			<div className="flex justify-center items-center">
				<Image
					src={'/strawberry-energy-juice.png'}
					width={135}
					height={135}
					objectFit="contain"
					sizes={'(max-width: 900px) 100vw, 50vw'}
					//sizes={'(max-width: 600px) 80vw, (max-width: 900px) 50vw, 25vw'}
					/* layout={'fill'}
					sizes={'(max-width: 600px) 80vw, (max-width: 900px) 50vw, 25vw'}
					objectFit={'contain'} */
					className="hidden md:block"
					alt={'juice'}
				/>
			</div>
		</section>
	);
}
