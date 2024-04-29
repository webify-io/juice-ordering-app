import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '../components/layout/SectionHeaders';

export default function Home() {
	return (
		<>
			<Hero />
			<HomeMenu />
			<section className="text-center my-16">
				<SectionHeaders subHeader={'Our Story'} mainHeader={'About Us'} />
				<div className="max-w-2xl mx-auto mt-4 text-gray-500 flex flex-col gap-4">
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
						consectetur autem iusto harum repudiandae rerum fugit, expedita
						unde, distinctio deserunt nobis necessitatibus at dolor quo officiis
						praesentium aperiam dolorem! Voluptatum.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
						magnam beatae. Libero aperiam facere cumque et dolore, ipsa, maiores
						eos earum deserunt enim perferendis? Explicabo qui mollitia et
						officia architecto.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
						excepturi quas harum autem magnam mollitia.
					</p>
				</div>
			</section>
			<section className="text-center my-8">
				<SectionHeaders
					subHeader={"Don't Hesitate"}
					mainHeader={'Contact Us'}
				/>
				<div className="text-4xl mt-8 text-gray-500 underline">
					<a href="tel:+27645584110">+27 645 584 110</a>
				</div>
			</section>
		</>
	);
}
