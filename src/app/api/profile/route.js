import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import User from '../../../models/User';
import { UserInfo } from '../../../models/UserInfo';

export async function PUT(req) {
	mongoose.connect(process.env.MONGO_URL);

	const data = await req.json();
	// Grab name and image from data and otherUserInfo from form:
	const { name, image, ...otherUserInfo } = data;

	const session = await getServerSession(authOptions);
	const email = session.user.email;

	// Only want to update {User} Schema with name and image:
	await User.updateOne({ email }, { name, image });
	// Update {UserInfo} Schema with otherUserInfo:
	await UserInfo.findOneAndUpdate({ email }, otherUserInfo, { upsert: true });

	return Response.json(true);
}

export async function GET() {
	// Connnect to the db
	mongoose.connect(process.env.MONGO_URL);

	// Grab seesion & user email:
	const session = await getServerSession(authOptions);
	// check if user exists:
	const email = session?.user?.email;
	if (!email) {
		return Response.json({});
	}

	const user = await User.findOne({ email }).lean();
	const userInfo = await UserInfo.findOne({ email }).lean();

	// If we have an email of already logged-in user, we want to return all of the user info from the db of this user:
	return Response.json({ ...user, ...userInfo });
}
