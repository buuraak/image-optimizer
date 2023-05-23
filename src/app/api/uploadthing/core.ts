/** app/api/uploadthing/core.ts */
import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f
    .fileTypes(["image"])
    .maxSize("1GB")
    .middleware(async (req) => {
        return { message: 'Upload completed!'};
    })
    .onUploadComplete(async ({ metadata, file }) => {
        console.log(metadata.message);
        console.log("file url", file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
