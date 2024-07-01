import { useState } from 'react';

export default function DeleteButton({ label, onDelete }) {
	const [showConfirm, setShowConfirm] = useState(false);

	if (showConfirm) {
		return (
			<div className="fixed bg-black/70 inset-0 flex items-center h-full justify-center">
				<div className=" bg-white p-4 rounded-md">
					<div>Are you sure you want to delete?</div>
					<div className="flex gap-2 mt-1">
						<button type="button" onClick={() => setShowConfirm(false)}>
							Cancel
						</button>
						<button onClick={onDelete} type="button" className="primary">
							Confirm
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<button type="button" onClick={() => setShowConfirm(true)}>
			{label}
		</button>
	);
}
