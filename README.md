# image optimzer
Web application where you can optimize your images/files (PNG, JPG or PDF). Files will first be uploaded to an AWS S3 bucket, this will then return a public url and this will then be forwared to the CloudConvert API which will then convert your file/image and return a downloadable link.

Services used in this application:
1. Next.js
2. AWS SDK
3. Axios
4. CloudConvert API
