"use client"
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

import styles from "@/styles/form.module.css"

const MultiSelectComp = (props) => {
    const {
        name,
        setForm,
        form,
        required,
        label,
        options,
        defaultValue,
    } = props

    const [selected, setSelected] = useState(defaultValue || []);

    const handleChange = value => {
        setForm({...form, [name]: value})
        setSelected(value)
    }

    return (
        <div className={`${styles.form_field}`}>
            {label && <label>{label} {!required && "(optional)"} </label>}
            <MultiSelect
                options={options}
                value={selected}
                onChange={handleChange}
                labelledBy="Select"
                required={required}
            />
        </div>
    );
};
export default MultiSelectComp