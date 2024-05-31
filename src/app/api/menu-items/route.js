import mongoose from 'mongoose';
import { MenuItem } from '../../../models/MenuItem';

export async function POST(req) {
	// Connect to the DB:
	mongoose.connect(process.env.MONGO_URL);

	const data = await req.json();
	const menuItemDoc = await MenuItem.create(data);
	return Response.json(menuItemDoc);
}

// GET endpoint for fetch('/api/menu-items'):
export async function GET() {
	// Connect to the DB:
	mongoose.connect(process.env.MONGO_URL);

	return Response.json(await MenuItem.find());
}
