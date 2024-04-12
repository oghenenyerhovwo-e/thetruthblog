"use client"
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from "@/styles/form.module.css"

const Date = (props) => {
    const {
        name,
        form,
        setForm,
        required,
        label,
    } = props

    const [startDate, setStartDate] = useState(new Date());

    const handleDate = (date) => {
        setForm({...form, [name]: date,})
        setStartDate(date)
    }

    return (
            <div className={`${styles.form_field}`}>
                {label && <label>{label} {!required && "(optional)"} </label>}
                <DatePicker 
                    selected={startDate} 
                    onChange={handleDate}
                    required={required}
                />
            </div>
    );
};
export default Date