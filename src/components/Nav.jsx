"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { FaAnglesDown,  } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';

import { closeIcon } from "@/assets"

import styles from "@/styles/nav.module.css"

const NavLink = () => {
  return (
    <ul className="">
        <li><Link href="/"> Home </Link></li>
        <li><Link href="/"> Politics </Link></li>
        <li><Link href="/"> Sport </Link></li>
        <li><Link href="/"> Entertainment </Link></li>
        <li><Link href="/"> Business </Link></li>
        <li><Link href="/"> News </Link></li>
        <li><Link href="/"> Technology </Link></li>
        <li><Link href="/"> International </Link></li>
        <li><Link href="/"> Features </Link></li>
        <li><Link href="/"> Blogs Feed </Link></li>
    </ul>
  )
}

const Nav = () => {
    const navbarRef = useRef(null);
    
    const [displayMenu, setDisplayMenu] = useState(false)

    useEffect(() => {
        const handleMenuWhenClickOutside = (event) => {
          // Close the navbar if it's open and the click is outside the navbar
          if (displayMenu && navbarRef.current && !navbarRef.current.contains(event.target)) {
            setDisplayMenu(false);
          }
        };
    
        // Add event listener to handle clicks outside the navbar
        document.addEventListener('click', handleMenuWhenClickOutside);
    
        // Clean up the event listener on component unmount
        return () => {
          document.removeEventListener('click', handleMenuWhenClickOutside);
        };
      }, [displayMenu]);

    const toggleMenu = () => setDisplayMenu(prevToggle => !prevToggle)
    const closeMenu = () => setDisplayMenu(false)

    return (
        <div className={`${styles.navbar_wrapper} content-grid`}>
            <div className={`${styles.nav_title} spacing-sm`}>
                <h1>The Truth Blog</h1>
                <p>...to know</p>
            </div>
            <nav className={`${styles.navbar} full-width`}>
                <div className={`${styles.navbar_content}`}>
                    <NavLink />
                    <ul>
                        <li onClick={toggleMenu}>
                            <span>More</span>
                            <span><FaAnglesDown /> </span>
                        </li>
                    </ul>
                </div>
            </nav>
            <AnimatePresence mode="wait">
                {
                    displayMenu && (
                        <motion.div
                            key="menubar_smallscreen"
                            className={`${styles.navbar_smallscreen_overlay}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                ref={navbarRef}
                                initial={{ x: "100vw", opacity: 0, }}
                                animate={{ x: "0vw", opacity: 1, }}
                                exit={{ x: "100vw", opacity: 0, }}
                                transition={{ duration: 0.5 }}
                                className={`${styles.navbar_smallscreen}`}
                            >
                                <motion.div 
                                    onClick={closeMenu}
                                    initial={{ x: "-100vw", rotate: 0, opacity: 0, }}
                                    animate={{ x: "0vw", rotate: 360, opacity: 1, }}
                                    exit={{ x: "0100vw", rotate: 0, opacity: 0, }}
                                    className={`${styles.navbar_smallscreen_cancel_btn}`}
                                >
                                    <Image src={closeIcon} alt="a close menu icon" />
                                </motion.div>
                                <div className={`${styles.nav_title} spacing-sm`}>
                                    <h1>The Truth</h1>
                                </div>
                                <NavLink />
                                <div className={`${styles.navbar_smallscreen_button}`}>
                                    <button>Subscribe</button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}

export default Nav