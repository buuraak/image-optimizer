"use client"
import React, { useState } from 'react';
import axios from "axios";

const Uploader = () => {
    const [file, setFile] = useState<any>();
    const [message, setMessage] = useState<string>();

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target && event.target.files) {
            setFile(event.target.files[0]);
            setMessage(`${event.target.files[0].name} has been added!`);
        }
    }

    const uploadFile = async () => {
        let data  =  await fetch('/api/s3', {
            method: 'POST',
            body: JSON.stringify({name: encodeURIComponent(file.name), type: encodeURIComponent(file.type)})
        });
        try {
            const url = await data.json();
            await axios.put(url, file, {
                headers: {
                    "Content-type": file.type,
                    "Access-Control-Allow-Origin": "*",
                },
            });
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <label htmlFor="uploader" className="bg-white py-[.6rem] px-5 tracking-tight leading-tight  hover:bg-white/90 rounded-sm cursor-pointer text-black">Choose file</label>
            <input type="file" id="uploader"  className='hidden'  onChange={fileChangeHandler} accept='.png,.pdf,.jpg'/>
            {file && message &&
                <>
                    <button onClick={uploadFile} className="bg-transparent tracking-tight leading-tight text-white rounded-sm py-2 px-5 ml-3 border-white border-[1px]">Upload!</button>
                    <small className="block mt-3">{message}</small>
                </>
            }
        </>
    )
}

export default Uploader;
