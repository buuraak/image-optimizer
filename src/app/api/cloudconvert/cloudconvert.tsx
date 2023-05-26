import CloudConvert from "cloudconvert";

//const cloudConvert = new CloudConvert(process.env.NEXT_PUBLIC_CLOUDCONVERT_SECRET);

//export const OptimizeFile = async (fileName: string, url: string) => {
    // Create a new job for the image
//    let job = await cloudConvert.jobs.create({
//        "tasks": {
//            "import": {
//                "operation": "import/url",
//                "url": url,
//                "filename": fileName
//            },
//            "optimize": {
//                "operation": "optimize",
//                "input": [
//                    "import"
//                ]
//            },
//            "export-optimized": {
//                "operation": "export/url",
//                "input": [
//                    "optimize"
//                ],
//                "inline": false,
//                "archive_multiple_files": false
//            }
//        },
//        "tag": "jobbuilder"
//    });
//    // Wait asynchronously for the job to complete
//    job = await cloudConvert.jobs.wait(job.id);
//
    //Export the temporary url
//    const file = cloudConvert.jobs.getExportUrls(job)[0];
//
//   return file;
//}
