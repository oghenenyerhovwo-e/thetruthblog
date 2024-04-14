"use client"
import { useState } from "react"
import Image from 'next/image'
import { FileUploader } from "react-drag-drop-files";

// images
import { closeIcon } from "@/assets"

import styles from "@/styles/form.module.css"

const File = (props) => {
    const {
        placeholder,
        name,
        form,
        setForm,
        required,
        types,
        label,
        maxSize,
        minSize,
        setError,
    } = props

    const [url, setUrl] = useState("");
    const [filePlaceholder, setFilePlaceholder] = useState(placeholder);

    const closePreview = () => {
        setUrl("")
        setFilePlaceholder(placeholder)
    }
    const fileUpload = async file => {
        if(file){
            setError("")
            setFilePlaceholder("uploading...")
            const data = new FormData();
            data.append("file", file);
            data.append(
                "upload_preset",
                process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
            );
            data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
            data.append("folder", "thetruthblog");

            try {
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                      method: "POST",
                      body: data,
                    }
                );
                const res = await response.json();
                setForm({
                  ...form,
                  [name]: res.secure_url,
                })
                setUrl(res.secure_url)
                setFilePlaceholder("file upload successfully")
            } catch (error) {
                console.log(error)
                setError("Error while uploading file")
                setFilePlaceholder("Error while uploading file")
            }
        }
    }

    const handleSizeError=() => {
        setError(`file must be larger than ${minSize || 0}mb but smaller than ${maxSize}mb`)
    }

    return (
        <>
            {
                !url ? (
                    <FileUploader 
                        handleChange={fileUpload} 
                        name={name} 
                        types={types} 
                        required={required}
                        hoverTitle={filePlaceholder}
                        label={filePlaceholder}
                        maxSize={maxSize}
                        minSize={minSize}
                        onSizeError={handleSizeError}
                    >
                        <div className={`${styles.form_field}`}>
                            {label && <label>{label} {!required && "(optional)"} </label>}
                            <div className={`${styles.form_file_input}`}>
                                {filePlaceholder}
                            </div>
                        </div>
                    </FileUploader>
                ) : (
                    <div className={`${styles.form_field_file_img_preview}`}>
                        <Image
                            src={url}
                            alt={`preview`}
                            width={20}
                            height={20}
                        />
                        <div className={`${styles.form_field_file_img_cancel}`}>
                            <Image onClick={closePreview} src={closeIcon} alt="a close menu icon" />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default File