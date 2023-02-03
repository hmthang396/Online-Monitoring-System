import React, { useState } from 'react'
import Dropzone from 'react-dropzone-uploader'
import { postFetch } from '../../config/fetchData';

const MyDropzone = ({getFile}) => {
    const [files,setFiles] = useState(null);
    const getUploadParams = ({ file, meta }) => {
        getFile(file);
        // data.append("upload_preset", "Online-Monitoring-System");
        // data.append("cloud_name", "hmthang396");

        // fetch("http://localhost:4000/Account/image", {
        //     method: "post",
        //     body: data,
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        return { url: 'https://httpbin.org/post', file }
    }
    const handleChangeStatus = ({ meta, file }, status) => { 
        //console.log(status, meta, file) 
    }
    const handleSubmit = (files, allFiles) => {
        //console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }
    return (
        <div className="dropzone">
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="image/*"
            />
        </div>
    )
}

export default MyDropzone