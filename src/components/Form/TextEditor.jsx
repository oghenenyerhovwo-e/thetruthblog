"use client"
// Importing helper modules
import { useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Importing styles
import "react-quill/dist/quill.snow.css";
import styles from "@/styles/form.module.css"

const TextEditor = (props) => {
    const {
        setContent,
        content,
        required,
        label,
    } = props

    // Editor ref
    const quill = useRef();
    const QuillEditor = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

    const imageHandler = useCallback(() => {
        // Create an input element of type 'file'
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
    
        // When a file is selected
        input.onchange = () => {
          const file = input.files[0];
          const reader = new FileReader();
    
          // Read the selected file as a data URL
          reader.onload = () => {
            const imageUrl = reader.result;
            const quillEditor = quill.current.getEditor();
    
            // Get the current selection range and insert the image at that index
            const range = quillEditor.getSelection(true);
            quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
          };
    
          reader.readAsDataURL(file);
        };
      }, []);

      const modules = useMemo(
        () => ({
          toolbar: {
            container: [
              [{ header: [2, 3, 4, false] }],
              ["bold", "italic", "underline", "blockquote"],
              [{ color: [] }],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
            ],
            handlers: {
              image: imageHandler,
            },
          },
          clipboard: {
            matchVisual: true,
          },
        }),
        [imageHandler]
      );
    
      const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "clean",
      ];

    const handleChange =  (value) => setContent(value)

    const handleRef = (el) => (quill.current = el)

    return (
        <div className={`${styles.form_field}`}>
            {label && <label>{label} {!required && "(optional)"} </label>}
            <QuillEditor
                ref={handleRef}
                className={styles.form_text_editor}
                theme="snow"
                value={content}
                formats={formats}
                modules={modules}
                onChange={handleChange}
            />
        </div>
    );
};
export default TextEditor