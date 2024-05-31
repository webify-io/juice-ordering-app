import { Schema, model, models } from 'mongoose';

const UserInfoSchema = new Schema(
	{
		// Identification on which users schema it is:
		email: { type: String, required: true },

		surname: { type: String },
		phone: { type: String },
		streetAddress: { type: String },
		city: { type: String },
		postalCode: { type: String },
		province: { type: String },
		admin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);
