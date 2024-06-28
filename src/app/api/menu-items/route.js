import mongoose from 'mongoose';
import { MenuItem } from '../../../models/MenuItem';
import { isAdmin } from '../auth/[...nextauth]/route';

// POST for creating new menu-item:
export async function POST(req) {
	// Connect to the DB:
	mongoose.connect(process.env.MONGO_URL);
	const data = await req.json();

	if (await isAdmin()) {
		const menuItemDoc = await MenuItem.create(data);

		return Response.json(menuItemDoc);
	} else {
		return Response.json({});
	}
}

// PUT for updating menu-item:
export async function PUT(req) {
	mongoose.connect(process.env.MONGO_URL);

	if (await isAdmin()) {
		const { _id, ...data } = await req.json();
		await MenuItem.findByIdAndUpdate(_id, data);
	}

	return Response.json(true);
}

// GET endpoint for fetch('/api/menu-items'):
export async function GET() {
	mongoose.connect(process.env.MONGO_URL);

	return Response.json(await MenuItem.find());
}

// DELETE for deleting menu-items:
export async function DELETE(req) {
	mongoose.connect(process.env.MONGO_URL);

	const url = new URL(req.url);
	const _id = url.searchParams.get('_id');

	if (isAdmin()) {
		await MenuItem.deleteOne({ _id });
	}
	return Response.json(true);
}
