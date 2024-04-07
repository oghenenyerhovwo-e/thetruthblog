
import styles from "@/styles/alert.module.css"

const Alert = (props) => {
    const { message, variant } = props
    return (
        <div className={`${styles.alert} ${styles[`alert_${variant || "info"}`]}`}>
            {message}
        </div>
    )
}

export default Alert