import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import User from '../../../models/User';
import { UserInfo } from '../../../models/UserInfo';

export async function PUT(req) {
	mongoose.connect(process.env.MONGO_URL);

	const data = await req.json();
	// Grab name and image from data and otherUserInfo from form:
	const { _id, name, image, ...otherUserInfo } = data;

	let filter = {};
	if (_id) {
		filter = { _id };
	} else {
		const session = await getServerSession(authOptions);
		const email = session.user.email;
		filter = { email };
	}
	// Grab the user:
	const user = await User.findOne(filter);
	// Update {User} Schema using filter:
	await User.updateOne(filter, { name, image });
	// Update {UserInfo} Schema using filter:
	await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
		upsert: true,
	});

	return Response.json(true);
}

export async function GET(req) {
	// Connnect to the db
	mongoose.connect(process.env.MONGO_URL);

	// Grab user info from userInfos:
	const url = new URL(req.url);
	const _id = url.searchParams.get('_id');

	let filterUser = {};
	if (_id) {
		filterUser = { _id };
	} else {
		// Grab seesion & user email for our own user:
		const session = await getServerSession(authOptions);
		// check if user exists:
		const email = session?.user?.email;
		if (!email) {
			return Response.json({});
		}
		filterUser = { email };
	}
	const user = await User.findOne(filterUser).lean();
	const userInfo = await UserInfo.findOne({ email: user.email }).lean();

	// We want to return all of the user info from the db of this user, as 1 object:
	return Response.json({ ...user, ...userInfo });
}
