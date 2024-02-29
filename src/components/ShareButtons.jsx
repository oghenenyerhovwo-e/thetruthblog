"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from 'framer-motion';

import { 
    BsWhatsapp,
    BsFacebook,
    BsTwitter,
    BsLinkedin,
    BsTelegram,
    BsPinterest,
} from "react-icons/bs"
import { MdEmail, MdExpandMore } from "react-icons/md"
import { GrTumblr } from "react-icons/gr"

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

import styles from "@/styles/sharebutton.module.css"

const ShareButtons = (props) => {
    const { url, title, tags, headline, source } = props

    const content = `${title} \n ${headline} \n`
    const formatTags="#gg"

    const shareButtonMenuRef = useRef(null);
    const [displayMoreButtons, setDisplayMoreButtons] = useState(false)

    useEffect(() => {
        const handleCloseShareButtonMenuWHenClickOutside = (event) => {
          // Close the navbar if it's open and the click is outside the navbar
          if (displayMoreButtons && shareButtonMenuRef.current && !shareButtonMenuRef.current.contains(event.target)) {
            setDisplayMoreButtons(false);
          }
        };
    
        // Add event listener to handle clicks outside the navbar
        document.addEventListener('click', handleCloseShareButtonMenuWHenClickOutside);
    
        // Clean up the event listener on component unmount
        return () => {
          document.removeEventListener('click', handleCloseShareButtonMenuWHenClickOutside);
        };
      }, [displayMoreButtons]);

    const toggleDisplayMoreButtons = () => setDisplayMoreButtons(prevToggle => !prevToggle)

    return (
        <div className={`${styles.share_btns}`}>
            <WhatsappShareButton
                url={url}
                hashtag={formatTags}
                quote={content}
                title={title}
            >
                <span className={`${styles.whatsapp_btn} ${styles.social_btn}`}>
                    <BsWhatsapp />
                    <span>Whatsapp</span>
                </span>
            </WhatsappShareButton>

            <FacebookShareButton
                url={url}
                hashtag={formatTags}
                quote={content}
            >
                <span className={`${styles.facebook_btn} ${styles.social_btn}`}>
                    <BsFacebook />
                    <span>Facebook</span>
                </span>
            </FacebookShareButton>

            <TwitterShareButton
                url={url}
                hashtag={formatTags}
                quote={content}
            >
                <span className={`${styles.twitter_btn} ${styles.social_btn}`}>
                    <BsTwitter />
                    <span>Twitter</span>
                </span>
            </TwitterShareButton>

            <div className={`${styles.share_btns_more}`}>
                <button onClick={toggleDisplayMoreButtons} className={`${styles.more_btn}`}>
                    <span>More</span>
                    <MdExpandMore />
                </button>
                <AnimatePresence mode="wait">
                    {
                        displayMoreButtons && (
                            <motion.div
                                ref={shareButtonMenuRef}
                                initial={{ opacity: 0, top: "100%", }}
                                animate={{ opacity: 1, top: "0%", }}
                                exit={{ opacity: 0, top: "100%", }}
                                transition={{ duration: 0.5 }}
                            >
                                <LinkedinShareButton
                                    url={url}
                                    title={title}
                                    body={headline}
                                    summary={formatTags}
                                    source={source}
                                >
                                    <span className={`${styles.linkedin_btn} ${styles.social_btn}`}>
                                        <BsLinkedin />
                                        <span>Linkedin</span>
                                    </span>
                                </LinkedinShareButton>

                                <TelegramShareButton
                                    url={url}
                                    hashtag={formatTags}
                                    quote={content}
                                >
                                    <span className={`${styles.telegram_btn} ${styles.social_btn}`}>
                                        <BsTelegram />
                                        <span>Telegram</span>
                                    </span>
                                </TelegramShareButton>

                                <TelegramShareButton
                                    url={url}
                                    hashtag={formatTags}
                                    quote={content}
                                    title={title}
                                >
                                    <span className={`${styles.telegram_btn} ${styles.social_btn}`}>
                                        <BsTelegram />
                                        <span>Telegram</span>
                                    </span>
                                </TelegramShareButton>

                                <TumblrShareButton
                                    url={url}
                                    hashtag={formatTags}
                                    quote={content}
                                >
                                    <span className={`${styles.tumblr_btn} ${styles.social_btn}`}>
                                        <GrTumblr />
                                        <span>Tumblr</span>
                                    </span>
                                </TumblrShareButton>

                                <PinterestShareButton
                                    url={url}
                                    hashtag={formatTags}
                                    description={content}
                                >
                                    <span className={`${styles.pinterest_btn} ${styles.social_btn}`}>
                                        <BsPinterest />
                                        <span>Pinterest</span>
                                    </span>
                                </PinterestShareButton>

                                <EmailShareButton
                                    url={url}
                                    subject={title}
                                    body={headline}
                                    hashtag={formatTags}
                                >
                                    <span className={`${styles.email_btn} ${styles.social_btn}`}>
                                        <MdEmail />
                                        <span>Email</span>
                                    </span>
                                </EmailShareButton>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ShareButtons