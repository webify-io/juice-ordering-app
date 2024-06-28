import bcrypt from 'bcrypt';
//import mongoose from 'mongoose';
import * as mongoose from 'mongoose';
//import { User } from '@/models/User';
import User from '../../../../models/User';
import NextAuth, { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../../libs/mongoConnect';
import { UserInfo } from '../../../../models/UserInfo';

export const authOptions = {
	secret: process.env.SECRET,
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: 'Credentials',
			id: 'credentials',
			credentials: {
				username: {
					label: 'Email',
					type: 'email',
					placeholder: 'test@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},

			/* 1 - Database Connection: It’s not a good practice to connect to the database inside the authorize function. Ideally, you should establish a connection to your database when your application starts and reuse that connection. You can use mongoose.connection.readyState to check if you’re already connected.
			2 - Error Handling: There’s no error handling in your authorize function. If there’s an error while fetching the user or comparing passwords, it might fail silently. Consider adding try/catch blocks around these operations.
			3 - Asynchronous bcrypt: You’re using the synchronous versions of bcrypt.genSaltSync and bcrypt.hashSync. While this is not wrong, it’s recommended to use the asynchronous versions (bcrypt.genSalt and bcrypt.hash) to avoid blocking the event loop.
			4 - Closing Database Connection: After you’re done with the database operation, it’s a good practice to close the connection, especially when you’re connecting inside a function. */
			async authorize(credentials, req) {
				const email = credentials?.email;
				const password = credentials?.password;

				try {
					// Check if already connected to the database
					if (mongoose.connection.readyState !== 1) {
						await mongoose.connect(process.env.MONGO_URL);
					}

					const user = await User.findOne({ email });

					// Log the user object
					/* console.log('User:', user); */

					if (user) {
						// Use asynchronous bcrypt.compare
						const passwordOk = await bcrypt.compare(password, user.password);

						// Log the result of bcrypt.compareSync
						/* console.log('Password comparison result:', passwordOk); */

						if (passwordOk) {
							return user;
						}
					}
				} catch (error) {
					console.error('Error in authorize function:', error);
				} finally {
					// Close the database connection
					try {
						if (mongoose.connection.readyState === 1) {
							await mongoose.connection.close();
						}
					} catch (error) {
						console.error(
							'Error while closing the database connection:',
							error
						);
					}
				}

				/* const email = credentials?.email;
				const password = credentials?.password;

				mongoose.connect(process.env.MONGO_URL);
				const user = await User.findOne({ email });

				// Log the user object
				console.log('User:', user);

				if (user) {
					const passwordOk = bcrypt.compareSync(password, user.password);

					// Log the result of bcrypt.compareSync
					console.log('Password comparison result:', passwordOk);

					if (passwordOk) {
						return user;
					}
				} */

				/* ---------------------------------- */

				/* const passwordOk = user && bcrypt.compareSync(password, user.password);

				console.log({ passwordOk });

				if (passwordOk) {
					return user;
				} */

				/* ---------------------------------- */

				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
};

// Function to secure access to the db:
export async function isAdmin() {
	const session = await getServerSession(authOptions);
	const userEmail = session?.user?.email;
	if (!userEmail) {
		return false;
	}
	const userInfo = await UserInfo.findOne({ email: userEmail });
	if (!userInfo) {
		return false;
	}
	return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
