import Image from 'next/image'

import { AllArticles } from "@/components"
import { truthHero } from "@/assets"

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
              src={truthHero} 
              alt="An image of truth and accurate journalism" 
              width={90}
              height={60} 
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
