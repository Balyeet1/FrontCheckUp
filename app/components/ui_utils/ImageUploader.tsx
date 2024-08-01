import React, { useState, useEffect } from "react";

interface ImageDetails {
    name: string;
    size: string;
}

export default function ImageUploader({ image, setImage }: { image: File | null, setImage: any }) {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageDetails, setImageDetails] = useState<ImageDetails | null>(null);

    useEffect(() => {
        if (image) {
            setSelectedImage(image)
            setImageDetails({
                name: image.name,
                size: (image.size / 1024).toFixed(2), // size in KB
            });
        }
    }, [image])



    const handleImageChange = (event: any) => {
        const file = event.target.files[0];

        // Basic validation: Ensure it's an image
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            setImageDetails({
                name: file.name,
                size: (file.size / 1024).toFixed(2), // size in KB
            });
            setImage(file)
        } else {
            alert('Please select an image file (jpg, jpeg, png, etc.).');
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImageDetails(null);

        setImage(null)
    };

    return (
        <div className="flex flex-col items-center justify-center border border-gray-600 bg-gray-300 p-3 rounded-md">
            <div className="rounded-md text-black">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="opacity-0 absolute cursor-pointer"
                />
                <span>Drag & Drop your files or <span className="text-blue-400 underline">Browse</span></span>
            </div>
            {selectedImage && (
                <div className="relative mt-2 rounded-md shadow-md">
                    <div className="flex justify-center">
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Preview"
                            className="rounded-t-md"
                            style={{ maxWidth: '100%', maxHeight: '150px' }}
                        />
                    </div>
                    {imageDetails &&
                        <div className="flex justify-between items-center px-3 py-2 bg-black bg-opacity-50 text-white text-xs rounded-b-md">
                            <div>
                                <p className="truncate w-36">{imageDetails.name}</p>
                                <p>{imageDetails.size} KB</p>
                            </div>
                            <div>
                                <button onClick={removeImage} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full">
                                    &times;
                                </button>
                            </div>
                        </div>
                    }
                </div>
            )}
        </div>
    );
}