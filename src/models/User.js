import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: {
			type: String,
			required: true,
			validate: (pass) => {
				if (!pass?.length || pass.length < 4) {
					throw new Error('Password must be at least 5 characters');
				}
				return true;
			},
		},
	},
	{ timestamps: true }
);

/* Hash Password using bcrypt */
UserSchema.pre('save', function (next) {
	const user = this;

	if (!user.isModified('password')) {
		return next();
	}

	const salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(user.password, salt);
	next();
});
/* UserSchema.post('validate', function (user) {
	const notHashedPassword = user.password;
	const salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(notHashedPassword, salt);
}); */

const User = models?.User || model('User', UserSchema);

export default User;
