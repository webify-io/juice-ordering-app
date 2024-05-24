export default function ErrorBox({ children }) {
	return (
		<div className=" text-center p-4 mb-4 bg-red-100 text-red-700 border border-red-400 rounded">
			{children}
		</div>
	);
}
