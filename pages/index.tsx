import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <video autoPlay loop className={styles.backgroundVideo}>
        <source src="earth.mp4" type="video/mp4" />
        <source src="movie.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.grid}>
        <div className={styles.logo}>
        <Image src="/jeopardy.svg" layout="intrinsic" height={300} width={1000}/>
        </div>
        <div className={styles.button}>
          Join as Player  
        </div>
        <Link href="/host">
          <div className={styles.button}>
            Join as Host 
          </div>
        </Link>
        <Link href="/display">
        <div className={styles.button}>
          Host Screen Mode
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Home
