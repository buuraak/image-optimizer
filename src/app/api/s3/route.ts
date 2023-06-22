import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const ONE_HOUR: number = 60 * 60;
/*
 * Right now typescript gives an error because the process.env type returns 'string | undefined' which does not match the credentials typescript
 */
const AWS_ACCESS_KEY = process.env.ACCESS_KEY ?? "default";
const AWS_SECRET_KEY = process.env.SECRET_KEY ?? "default";

export async function POST(request: Request) {
    if (request.method !== "POST")
        NextResponse.json(
            { message: "Only POST method allowed" },
            { status: 405 }
        );
    const s3 = new S3Client({
        region: process.env.REGION,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY,
            secretAccessKey: AWS_SECRET_KEY,
        },
    });

    try {
        const formData = await request.formData();
        const file: any = formData.get("file");
        const fileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: file.name,
            ContentType: file.type,
        };
        const command = new PutObjectCommand(fileParams);
        const url = await getSignedUrl(s3, command, { expiresIn: ONE_HOUR });

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": file.type,
                "Access-Control-Allow-Origin": "*",
            },
            body: file,
        });
        return NextResponse.json({ fileName: file.name }, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ message: error }, { status: 400 });
    }
}
