"use client"
import styles from "@/styles/form.module.css"

import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

const MarkdownInput = (props) => {
    const {
        setContent,
        content,
        required,
        label,
        defaultValue,
    } = props

    const handleChange = (value, viewUpdate) => setContent(value)

    return (
        <div className={`${styles.form_field}`}>
            {label && <label>{label} {!required && "(optional)"} </label>}
            <MarkdownEditor
                value={content || defaultValue}
                onChange={handleChange}
                required={required}
            />
        </div>
    );
};
export default MarkdownInput