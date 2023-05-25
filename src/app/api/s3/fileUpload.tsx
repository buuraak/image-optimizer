import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
    region: "eu-north-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY
    },
    signatureVersion: "v4"
});

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "1mb",
        },
    },
};

export default async (request: NextApiRequest, response: NextApiResponse) =>  {
    if(request.method !== "POST") response.status(405).json({message: "Only POST method allowed"});

    try {
       let { name, type  } = request.body;

       const fileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: name,
            Expires: 600,
            ContentType: type,
            ACL: "public-read"
       };

        const url = await s3.getSignedUrlPromise("putObject", fileParams);

        response.status(200).json({ url  });

    } catch(error) {
        console.log(error);
        response.status(400).json({ message: error  });
    }
};
