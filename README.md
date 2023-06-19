# image optimzer
Simple web application which allows you to upload and compress images (PNG, JPG, PDF). 

## How does it work?
The application first uploads the original image on my own AWS S3 bucket, after a succesful upload the app creats a POST request to my <a href="https://github.com/buuraak/cloudconverter">Node.js application</a> which then uses the CloudConvert API to compress the image and sends back an URL including the download link of the compressed image.

## This application is built using
1. Next.js (version 13 using the new app router)
2. AWS SDK - S3
3. Tailwind CSS
4. TypeScript
