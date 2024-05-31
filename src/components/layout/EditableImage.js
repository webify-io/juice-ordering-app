import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ErrorBox from './ErrorBox';

export default function EditableImage({ link, setLink }) {
	// Add a new state variable for the error
	const [error, setError] = useState(null);

	// Function for handleFileChange
	async function handleFileChange(ev) {
		const files = ev.target.files;

		if (files?.length === 1) {
			const data = new FormData();
			data.set('file', files[0]);

			// Handle Fetch Errors:
			try {
				const uploadPromise = fetch('/api/upload', {
					method: 'POST',
					body: data,
				}).then(async (response) => {
					if (response.ok) {
						return response.json().then((link) => {
							setLink(link);
						});
					}
					throw new Error('Something went wrong.');
				});

				await toast.promise(uploadPromise, {
					loading: 'Uploading Image...',
					success: 'Image Updated.',
					error: "This didn't work.",
				});
			} catch (error) {
				console.error('Network error:', error);
				setError('Network error. Please try again later.');
				toast.error('Network error. Please try again later.');
			}
		}
	}
	// Clear the error state when the component unmounts
	useEffect(() => {
		return () => {
			setError(null);
		};
	}, []);

	return (
		<>
			{link && (
				<Image
					className="rounded-md w-full h-full mb-1"
					src={link}
					width={250}
					height={250}
					alt="avatar"
				></Image>
			)}
			{!link && (
				<div className="text-center bg-gray-100 px-4 py-8 text-gray-300 text-sm font-medium rounded-md mb-1">
					No Image
				</div>
			)}
			<label className="cursor-pointer">
				<input type="file" className="hidden" onChange={handleFileChange} />
				<span className="block border border-gray-300 rounded-sm p-2 text-center">
					Edit
				</span>
			</label>

			{error && <ErrorBox>{error}</ErrorBox>}
		</>
	);
}
