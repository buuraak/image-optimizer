# image optimzer
Simple web application which allows you to upload and compress images (PNG, JPG, PDF). 

## How does it work?
The application first uploads the original image on my own AWS S3 bucket, after a succesful upload the app creates a POST request to my <a href="https://github.com/buuraak/cloudconverter">Node.js application</a> which then uses the CloudConvert API to compress the image and sends back an URL including the download link of the compressed image.
***(The reason I use a separate Node.js application instead of the built in Node.js in Next.js is purely because I wanted to experiment building my own Node.js application)***

## This application is built using
1. Next.js (version 13 using the new app router)
2. AWS SDK - S3
3. Tailwind CSS
4. TypeScript

## Things I'd like to do/add in the future
1. Build user authentication which saves the compressed images. Which comes with functionalities such as requesting deletion of saved images.
