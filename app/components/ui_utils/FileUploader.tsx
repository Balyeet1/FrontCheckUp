"use client"
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import { useState } from 'react';


const UploadImage = ({ maxFiles = 1, files_list = [] }: { maxFiles?: number, files_list: Array<any> }) => {

    if (maxFiles < 1) throw new Error("Max files can't be less them 1.");

    const [files, setFiles] = useState(files_list);

    return (
        <FilePond
            allowMultiple={maxFiles === 1 ? false : true}
            maxFiles={maxFiles}
            server="/api"
            files={files}
        />
    )
}

export default UploadImage;