import styles from "@/styles/form.module.css"

const Textarea = (props) => {
    const {
        placeholder,
        name,
        value,
        onChange,
        required,
        type,
        label,
    } = props

    return (
        <div className={`${styles.form_field}`}>
            {label && <label>{label} {!required && "(optional)"} </label>}
            <textarea
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}

export default Textarea