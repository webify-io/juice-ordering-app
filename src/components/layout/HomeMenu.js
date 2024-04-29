import Image from 'next/image';
import MenuItem from '../menu/MenuItem';
import SectionHeaders from './SectionHeaders';

export default function HomeMenu() {
	return (
		<section>
			<div className="absolute left-0 right-0 w-full">
				<div className="absolute -top-[50px] right-0 -z-10">
					<Image
						src={'/fruit-2-1.png'}
						width={195}
						height={195}
						layout={'responsive'}
						alt={'water'}
					/>
				</div>
				{/* <div className="h-56 w-56 absolute -top-[50px] right-0 -z-10">
					<Image
						src={'/fruit-2-1.png'}
						layout={'fill'}
						sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
						objectFit={'contain'}
						alt={'water'}
					/>
				</div> */}

				<div className="absolute -top-[50px] left-0 -z-10">
					<Image
						src={'/fruit-1-2.png'}
						width={195}
						height={195}
						layout={'responsive'}
						alt={'water'}
					/>
				</div>
			</div>

			<div className="text-center mb-4">
				<SectionHeaders subHeader={'Check Our'} mainHeader={'Menu'} />
			</div>

			<div className="grid grid-cols-3 gap-4">
				<MenuItem />
				<MenuItem />
				<MenuItem />
				<MenuItem />
				<MenuItem />
				<MenuItem />
				<MenuItem />
				<MenuItem />
				<MenuItem />
			</div>
		</section>
	);
}
