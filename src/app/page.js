import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <div id={styles.main}>
      <Image src="/logo.jpg" alt="" width={175} height={140} />
      QuizMaster
      <h6 className={styles.heading}>
        Welcome to QuizMaster: Your Ultimate Quiz App for High School Students!
      </h6>
      <p className={styles.para} >
        Are you ready to challenge your knowledge and boost your learning in a
        fun and engaging way? Welcome to QuizMaster, the premier quiz app
        designed exclusively for high school students.
      </p>
      <Link href="/auth" id={styles.authButton}>
        Sign In/ Sign Up
      </Link>
    </div>
  );
}
