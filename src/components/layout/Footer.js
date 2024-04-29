'use client';

import React, { useState, useEffect } from 'react';

export default function Footer() {
	const [currentYear, setCurrentYear] = useState(null);

	useEffect(() => {
		const year = new Date().getFullYear();
		setCurrentYear(year);
	}, []);

	return (
		<footer className="border-t p-8 text-center text-gray-400 mt-16">
			<div>
				&copy; {currentYear} | All Rights Reserved | Powered by
				<a
					href="https://webify-io.github.io/webify/"
					target="_blank"
					rel="noopener noreferrer"
					style={{ marginLeft: '6px' }}
					className="text-blue-400 font-semibold"
				>
					Webify<sup>&reg;</sup>
				</a>
			</div>
		</footer>
	);
}
