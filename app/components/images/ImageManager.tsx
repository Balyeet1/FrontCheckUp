import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const baseStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

interface ImageValues {
    name: string;
    url: string;
}

const ImageManager = ({ setOpenManager }: { setOpenManager: Dispatch<SetStateAction<boolean>> }) => {

    

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: { 'image/*': [] } });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);


    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full m-3">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-bold">Image Manager</h2>
                        <button
                            onClick={() => setOpenManager(false)}
                            className="text-red-500 hover:text-red-700 transition"
                        >
                            Close
                        </button>
                    </div>
                    <div className='pb-4 text-sm'><strong><u>Upload</u></strong> and <strong><u>Select</u></strong> images to add to the content.</div>
                    <div className="pb-8">
                        <div {...getRootProps({ style })}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </div>
                    <div className="pr-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 max-h-[300px] overflow-auto">
                        {/* images.map((image) => (
                            <div key={image.name} className="relative group">
                                <Image
                                    width={50}
                                    height={50}
                                    src={image.url}
                                    alt={image.name}
                                    className="w-full h-auto rounded-md shadow-lg transition-transform duration-300 transform group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {image.name}
                                </div>
                            </div>
                        ))*/}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageManager;