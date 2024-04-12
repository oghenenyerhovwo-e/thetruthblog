"use client"
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// components
import Image from 'next/image'
import Link from 'next/link'
import { FaKey } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import Spinner from "./Spinner"
import Form from "./Form"
import Alert from "./Alert"

// functions
import { useChangeUserRoleMutation } from "@/redux"

// css
import styles from "@/styles/dashboardusercard.module.css"

const DashboardUserCard = props => {
    const { user, currentUser, setUserRoleChange } = props

    const changeUserRoleMenuRef = useRef(null);

    const [changeUserRole, { isLoading, error, isError }] = useChangeUserRoleMutation()

    const initialFormState = {
        password: "",
    }
    const [form, setForm] = useState(initialFormState)
    const [displayChangeRoleMenu, setDisplayChangeRoleMenu] = useState(false)
    const userProfilePic = user.profilePic

    useEffect(() => {
        const handleMenuWhenClickOutside = (event) => {
          // Close the navbar if it's open and the click is outside the navbar
          if (displayChangeRoleMenu && changeUserRoleMenuRef.current && !changeUserRoleMenuRef.current.contains(event.target)) {
            setDisplayChangeRoleMenu(false);
          }
        };
    
        // Add event listener to handle clicks outside the navbar
        document.addEventListener('click', handleMenuWhenClickOutside);
    
        // Clean up the event listener on component unmount
        return () => {
          document.removeEventListener('click', handleMenuWhenClickOutside);
        };
    }, [displayChangeRoleMenu]);

    const toggleMenu = () => setDisplayChangeRoleMenu(prevToggle => !prevToggle)
    const closeMenu = () => setDisplayChangeRoleMenu(false)

    const handleFormChange = e => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleChangeUserRole = e => {
        e.preventDefault()
        changeUserRole({id: user._id, body: {...form, isActive: !user.isActive}})
            .unwrap()
            .then((res) => {
                setDisplayChangeRoleMenu(false)
                setUserRoleChange({userId: res.userId})
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className={`${styles.dashboard_user_card}`}>
                <div className={`${styles.dashboard_user_card_img}`}>
                    <Image
                        src={userProfilePic}
                        alt={`An image of ${user.fullName}`}
                        width={20}
                        height={20}
                    />
                </div>
                <div className={`${styles.dashboard_user_card_title}`}>
                    <h4>{user.fullName} </h4>
                </div>
                <div className={`${styles.dashboard_user_card_category}`}>
                    <p>{user.isActive ? "Active": "Blocked"} </p>
                </div>
                <div className={`${styles.dashboard_user_card_icons}`}>
                    {
                        (currentUser.isAdmin || String(currentUser._id) === String(user._id) ) && (
                            <>
                                <Link onClick={toggleMenu} className={`${styles.edit}`} href="#">{user.active ? <MdBlock />: <FaKey /> } </Link>
                            </>
                        )
                    }
                </div>
            </div>
            <AnimatePresence mode="wait">
                {
                    displayChangeRoleMenu && (
                        <motion.div
                            key="change_role_menu_bar"
                            className={`${styles.change_role_menu_overlay}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                ref={changeUserRoleMenuRef}
                                initial={{ y: "-100vh", opacity: 0, }}
                                animate={{ y: "0vh", opacity: 1, }}
                                exit={{ y: "-100vh", opacity: 0, }}
                                transition={{ duration: 0.5 }}
                                className={`${styles.change_role_menu}`}
                            >
                                <h4 className="spacing-sm"> Are you sure you want to {user.isActive ? "block" : "activate"} this account</h4>
                                <div>
                                    <Form.Input
                                        value={form.password}
                                        type="password"
                                        onChange={handleFormChange}
                                        placeholder="enter password to confirm"
                                        required={true}
                                        name="password"
                                    />
                                </div>
                                <div className={`${styles.change_role_menu_buttons}`}>
                                    <button onClick={closeMenu}>cancel</button>
                                    {
                                    (isError && error && error.data && error.data.error) &&  (
                                        <div className={`spacing-sm`}>
                                            <Alert 
                                                message={error && error.data && error.data.error} 
                                                variant="danger" 
                                            />
                                        </div>
                                    )
                                }
                                <div className={`${styles.change_role_menu_buttons}`}>
                                    <button className={`${styles.cancel}`} onClick={closeMenu}>cancel</button>
                                    {
                                        !isLoading ? (
                                            <button className={`${styles.change_role}`} onClick={handleChangeUserRole}>{user.isActive ? "Block account" : "Activate account"}</button>
                                        ) : (
                                            <div className={`${styles.form_screen_spinner}`}>
                                                <Spinner />
                                            </div>
                                        )
                                    }
                                </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default DashboardUserCard