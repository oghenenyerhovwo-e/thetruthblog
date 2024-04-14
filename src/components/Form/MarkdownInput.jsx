"use client"
import MarkdownEditor from '@uiw/react-markdown-editor';

import styles from "@/styles/form.module.css"

const MarkdownInput = (props) => {
    const {
        setContent,
        content,
        required,
        label,
    } = props

    const handleChange = (value, viewUpdate) => setContent(value)

    return (
        <div className={`${styles.form_field}`}>
            {label && <label>{label} {!required && "(optional)"} </label>}
            <MarkdownEditor
                value={content}
                onChange={handleChange}
                required={required}
            />
        </div>
    );
};
export default MarkdownInput