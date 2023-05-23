"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../app//api/uploadthing/core";
import { OptimizeFile } from "@/app/api/cloudconvert/cloudconvert";

const Uploader = () => {
    return (
            <UploadButton<OurFileRouter>
                endpoint="imageUploader"
                onClientUploadComplete={async (res) => {
                    console.log("Files: ", res);
                    let file = await OptimizeFile(res[0].fileKey, res[0].fileUrl);
                    console.log(file.url);
                    alert(`Upload Completed your file is ${file.url}`);
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            /> 
    )
}

export default Uploader;
