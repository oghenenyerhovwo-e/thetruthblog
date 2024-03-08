"use client"
import { motion, AnimatePresence } from 'framer-motion';
import styles from "@/styles/loadingbox.module.css"

const LoadingBox = (props) => {
    const { display } = props

    return (
        <>
            <AnimatePresence mode="wait">
                {
                    display && (
                        <motion.div 
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            exit={{ opacity: 0, }}
                            className={`${styles.loading_box}`}
                        >
                            <div className={`${styles.loadingspinner}`}></div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default LoadingBox