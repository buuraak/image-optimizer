"use client"
import React, { useState } from 'react';
import axios from "axios";

const Uploader = () => {
    const [file, setFile] = useState<any>();
    const [uploadingStatus, setUploadingStatus] = useState<string>();
    const [message, setMessage] = useState<string>();

    const fileChangeHandler = event => {
        setFile(event.target.files[0]);
    }

    const uploadFile = async () => {
        setUploadingStatus("Uploading the image");
        let data  =  await fetch('/api/s3', {
            method: 'POST',
            body: JSON.stringify({name: encodeURIComponent(file.name), type: encodeURIComponent(file.type)})
        });

        const url = await data.json();

        await axios.put(url, file, {
            headers: {
                "Content-type": file.type,
                "Access-Control-Allow-Origin": "*",
            },
        })
    }

    return (
        <>
            <input type="file" onChange={fileChangeHandler} accept='.png,.pdf,.jpg'/>
            {file && 
                <button onClick={uploadFile} className="bg-sky-500 text-white py-2 px-3 mt-5 rounded-sm hover:bg-sky-700 transition-all duration-300">Upload!</button>
            }
        </>
    )
}

export default Uploader;
