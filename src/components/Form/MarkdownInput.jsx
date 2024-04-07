"use client"
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";

import styles from "@/styles/form.module.css"

const MarkdownInput = (props) => {
    const {
        setContent,
        content,
        required,
        label,
    } = props

    return (
        <div className={`${styles.form_field}`}>
            <label>{label} {!required && "(optional)"} </label>
            <MDEditor
                value={content}
                onChange={setContent}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
                required={required}
            />
        </div>
    );
};
export default MarkdownInput