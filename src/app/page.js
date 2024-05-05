import Image from 'next/image'

import { AllArticles } from "@/components"

import styles from "@/styles/home.module.css"

export default function Home() {
  return (
    <div className={`content-grid ${styles.home}`}>
      <div className={`${styles.home_hero_wrapper} spacing-xl`}>
        <div className={`${styles.home_hero}`}>
          <div className={`${styles.home_hero_text}`}>
            <h2>
              Insights <br />
              that <span>Inspire</span>, <br />
              News <br />
              that <span>Ignites</span>
            </h2>
          </div>
          <div className={`${styles.home_hero_img}`}>
            <Image 
              src={"https://res.cloudinary.com/dwxmqcikz/image/upload/v1714734744/thetruthblog/truth_hero_jj6jhl.jpg"} 
              alt="An image of truth and accurate journalism" 
              width={9}
              height={6} 
            />
            <div className={`${styles.home_hero_img_overlay}`}></div>       
          </div>
        </div>
      </div>
      <div className={`${styles.articles_wrapper}`}>
        <AllArticles />
      </div>
    </div>
  )
}
