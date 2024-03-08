import Link from 'next/link'
import styles from "@/styles/messagebox.module.css"

const MessageBox = (props) => {
    const { message } = props
    return (
        <div className={`${styles.message_box}`}>
            <h4>
                {message}
            </h4>
            <Link href="/">Back to home</Link>
        </div>
    )
}

export default MessageBox