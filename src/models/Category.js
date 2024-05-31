import { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema(
	{
		name: { type: String, required: true },
	},
	{ timestamps: true }
);

// Now we can create the model:
export const Category = models?.Category || model('Category', CategorySchema);
