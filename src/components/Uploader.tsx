"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

let fileName: string;

const Uploader = () => {
    const [file, setFile] = useState<any>();
    const [compressedFile, setCompressedFile] = useState<any>();
    const [message, setMessage] = useState<string>();

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target || !event.target.files) {
            return;
        } else if(event.target.files[0].size >= 5000000) {
            toast.error('File size cannot be larger than 5MB', {
                autoClose: 3000
            });
            return;
        }

        setFile(event.target.files[0]);
        setMessage(`${event.target.files[0].name} has been added!`);
        setCompressedFile(null);
    };

    const calculateCompressedData = ( originalSize: number, compressedSize: number ) => {
        const calculation = ((originalSize - compressedSize) / originalSize) * 100;
        return Math.round(calculation);
    };

    const uploadFile = async () => {
        const id = toast.loading("Uploading file...");
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/s3", {
                method: "POST",
                body: formData,
            });

            const responseData = await response.json();
            fileName = responseData.fileName;
        } catch (error) {
            console.log(error);
            toast.update(id, {
                render:
                    "An error has occurred while uploading the file. Please try again",
                type: "error",
                isLoading: false,
                closeButton: true,
            });
        }

        try {
            toast.update(id, { render: "Compressing file" });
            const compressorResponse = await fetch(
                "https://cloudconverter.vercel.app/compress-image",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ file: fileName }),
                }
            );

            const compressorData = await compressorResponse.json();

            toast.update(id, {
                render: "File compressed Successfully",
                type: "success",
                isLoading: false,
                autoClose: 3000,
                closeButton: true,
            });

            setCompressedFile(compressorData.file.url);
            setMessage(
                `You saved ${calculateCompressedData(
                    file.size,
                    compressorData.file.size
                )}%`
            );
            setFile(null);
        } catch (error) {
            console.log(error);
            toast.update(id, {
                render:
                    "An error has occurred while compressing the file. Please try again",
                type: "error",
                isLoading: false,
                closeButton: true,
            });
        }
    };

    return (
        <>
            <label
                htmlFor="uploader"
                className="bg-white py-[.6rem] px-5 tracking-tight leading-tight  hover:bg-white/90 rounded-sm cursor-pointer text-black"
            >
                Choose file
            </label>
            <input
                type="file"
                id="uploader"
                className="hidden"
                onChange={fileChangeHandler}
                accept=".png,.pdf,.jpg"
            />
            {file && message && (
                <>
                    <button
                        onClick={uploadFile}
                        className="bg-transparent tracking-tight leading-tight text-white rounded-sm py-2 px-5 ml-3 border-white border-[1px]"
                    >
                        Upload
                    </button>
                    <small className="block mt-5">{message}</small>
                </>
            )}
            {compressedFile && message && (
                <>
                    <a
                        href={compressedFile}
                        target="_blank"
                        className="bg-transparent tracking-tight leading-tight text-white rounded-sm py-2 px-5 ml-3 border-white border-[1px]"
                    >
                        Download
                    </a>
                    <small className="block mt-5">
                        <strong>{message}</strong>
                    </small>
                </>
            )}
            <ToastContainer />
        </>
    );
};

export default Uploader;
