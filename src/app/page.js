import Hero from '../components/layout/Hero';
import HomeMenu from '../components/layout/HomeMenu';
import SectionHeaders from '../components/layout/SectionHeaders';

export default function Home() {
	return (
		<>
			<Hero />
			<HomeMenu />
			<section className="text-center my-16" id="about">
				<SectionHeaders subHeader={'Our Story'} mainHeader={'About Us'} />
				<div className="max-w-2xl mx-auto mt-4 text-gray-500 flex flex-col gap-4">
					<p>
						Welcome to Eezi-fruit, where we believe that delicious and
						nutritious juice should be just a click away. We are passionate
						about sourcing the freshest fruits and turning them into delightful
						beverages that cater to your taste buds and health needs. At
						Eezi-fruit, we make it our mission to provide an easy, seamless, and
						enjoyable experience for you to order your favorite juices online.
						From the moment you browse our website to the time your juice is
						delivered to your door, we ensure every step is filled with quality,
						freshness, and convenience.
					</p>
					<p>
						Our commitment to excellence goes beyond just offering great-tasting
						juice. We are dedicated to maintaining sustainable practices by
						working with local farmers and using eco-friendly packaging. This
						not only supports our community but also reduces our environmental
						footprint. Our range of juices caters to every taste preference,
						from classic favorites like orange and apple to exotic blends
						featuring tropical fruits. Each bottle is packed with natural
						vitamins and minerals, ensuring that you get the best nourishment
						with every sip.
					</p>
					<p>
						At Eezi-fruit, we pride ourselves on exceptional customer service.
						Our team is always ready to assist you with any questions or special
						requests, making your juice ordering experience smooth and
						satisfying. We continually strive to innovate and improve, bringing
						new flavors and features to our website to keep you coming back for
						more. Join us on our journey to make healthy living easier and more
						enjoyable, one delicious juice at a time. Cheers to good health and
						great taste with Eezi-fruit! 🍹
					</p>
				</div>
			</section>
			<section className="text-center my-8" id="contact">
				<SectionHeaders
					subHeader={"Don't Hesitate"}
					mainHeader={'Contact Us'}
				/>
				<div className="text-4xl mt-8 text-gray-500 underline">
					<a href="tel:+27645584110">(+27)64-558-4110</a>
				</div>
			</section>
		</>
	);
}
