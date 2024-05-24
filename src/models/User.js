import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
	{
		name: { type: String },
		surname: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String },
		image: { type: String },
		phone: { type: String },
		streetAddress: { type: String },
		city: { type: String },
		postalCode: { type: String },
		province: { type: String },
	},
	{ timestamps: true }
);

const User = models?.User || model('User', UserSchema);

export default User;
