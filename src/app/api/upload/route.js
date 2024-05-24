import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import uniqid from 'uniqid';

export async function POST(req) {
	const data = await req.formData();
	if (data.get('file')) {
		// Upload the file to AWS S3 Bucket
		const file = data.get('file');

		// Initiate our S3 Client
		const s3Client = new S3Client({
			region: 'eu-north-1',
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY,
				secretAccessKey: process.env.AWS_SECRET_KEY,
			},
		});

		// Create new file name
		const ext = file.name.split('.').slice(-1)[0];
		const newFileName = uniqid() + '.' + ext;

		// Define buffer
		const chunks = [];
		for await (const chunk of file.stream()) {
			chunks.push(chunk);
		}
		const buffer = Buffer.concat(chunks);

		const BUCKET_NAME = 'juice-ordering';
		// Upload the file
		await s3Client.send(
			new PutObjectCommand({
				Bucket: BUCKET_NAME,
				Key: newFileName,
				ACL: 'public-read',
				ContentType: file.type,
				Body: buffer,
			})
		);

		//const BUCKET_REGION = 'eu-north-1';
		// link to file
		const link =
			'https://' + BUCKET_NAME + '.s3.eu-north-1.amazonaws.com/' + newFileName;
		return Response.json(link);
	}
	return Response.json(true);
}
