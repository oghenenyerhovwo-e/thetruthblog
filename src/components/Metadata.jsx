import Head from "next/head"

const Metadata = (props) => {
    const { title } = props
    return (
        <Head>
            <div>{title} </div>
        </Head>
    )
}



export default Metadata
