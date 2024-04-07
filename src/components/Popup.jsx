"use client"
import { useRef, useEffect, useCallback } from "react"

import { motion, AnimatePresence } from 'framer-motion';
import styles from "@/styles/popup.module.css"

const Popup = (props) => {
    const { display, setDisplay } = props

    const popupRef = useRef(null); 

    const closeDisplay = useCallback(
      () => {
        setDisplay(false)
      },
      [setDisplay],
    )
    

    useEffect(() => {
        const handleCloseCommentSectionWhenClickOutside = (event) => {
          // Close the navbar if it's open and the click is outside the navbar
          if (display && popupRef.current && !popupRef.current.contains(event.target)) {
            closeDisplay();
          }
        };
    
        // Add event listener to handle clicks outside the navbar
        document.addEventListener('click', handleCloseCommentSectionWhenClickOutside);
    
        // Clean up the event listener on component unmount
        return () => {
          document.removeEventListener('click', handleCloseCommentSectionWhenClickOutside);
        };
      }, [display, closeDisplay]);

    return (
        <AnimatePresence mode="wait">
            {
                display && (
                    <motion.div
                        ref={popupRef}
                        initial={{ y: "100vh", opacity: 0, }}
                        animate={{ y: "0vh", opacity: 1, }}
                        exit={{ y: "100vh", opacity: 0, }}
                        transition={{ duration: 0.5 }}
                        className={`content-grid`}
                    >
                        <div className={`${styles.popup}`}>
                            {props.children}
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Popup
