import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from "next/server";

const ONE_HOUR: number = (60 * 60);


export async function POST(request: Request) {
    if(request.method !== "POST") NextResponse.json({message: "Only POST method allowed"}, {status: 405});
    const s3 = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY
    },
    signatureVersion: 'v4'
});


    try {
        let { name, type  } = await request.json();

        const fileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: name,
            ContentType: type,
        };
        const command = new PutObjectCommand(fileParams);
        const url = await getSignedUrl(s3, command, {expiresIn: ONE_HOUR});

        return NextResponse.json(url, {status:200});

    } catch(error) {
        console.log(error);
        NextResponse.json({ message: error  }, {status: 400});
    }
}


