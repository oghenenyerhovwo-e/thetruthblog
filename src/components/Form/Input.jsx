"use client"
import { useState, useEffect } from 'react'

import {BiHide} from "react-icons/bi"
import {BiShow} from "react-icons/bi"

import styles from "@/styles/form.module.css"

const Input = (props) => {
    const {
        placeholder,
        name,
        value,
        onChange,
        required,
        type,
        label,
    } = props

    const [showIcon, setShowIcon] = useState(false)
    const [inputType, setInputType] = useState("")

    const handleIcon = (e) => {
        // e.stopPropagation()
        if(!showIcon){
            setInputType("text")
        } else{
            setInputType("password")
        }
        setShowIcon(prevState => !prevState )
    }

    useEffect(() => {
        setInputType(type)
    }, [type])

    return (
        <div className={`${styles.form_field}`}>
            {label && <label>{label} {!required && "(optional)"} </label>}
            <input
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                type={inputType}
            />
            {
                type === "password" && (
                    <span className={`${styles.form_field_password_icon}`}>
                        { !showIcon ? <BiShow onClick={handleIcon} /> : <BiHide onClick={handleIcon} />}
                    </span>
                )
            }
        </div>
    )
}

export default Input