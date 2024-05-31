import { useEffect, useState } from 'react';

// Hook for Admin Profile:
export default function useProfile() {
	// Access control for unauthorised users:
	const [data, setData] = useState(false);
	// State for adminInfoLoading:
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetch('/api/profile').then((response) => {
			response.json().then((data) => {
				setData(data);
				setLoading(false);
			});
		});
	}, []);

	return { loading, data };
}
