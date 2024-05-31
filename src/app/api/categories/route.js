import mongoose from 'mongoose';
import { Category } from '../../../models/Category';

export async function POST(req) {
	// Connect to the DB:
	mongoose.connect(process.env.MONGO_URL);

	const { name } = await req.json();
	// create the Category Model:
	const categoryDoc = await Category.create({ name });
	return Response.json(categoryDoc);
}

export async function PUT(req) {
	// Connect to the DB:
	mongoose.connect(process.env.MONGO_URL);

	const { _id, name } = await req.json();
	await Category.updateOne({ _id }, { name });
	return Response.json(true);
}

export async function GET() {
	// Connect to the DB:
	mongoose.connect(process.env.MONGO_URL);

	return Response.json(await Category.find());
}
