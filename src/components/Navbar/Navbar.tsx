import React, {FC} from "react"
import styles from "./Navbar.module.css"
import {Link} from "react-router"

import profile_logo from "../../assets/icons/profile_logo.svg"

const Navbar: FC = () => {
	return (
		<div className={styles.navbar}>
			<div className={styles.links}>
				<Link to="/" className={styles.link}>
					Tasks
				</Link>
				<Link to="/playground" className={styles.link}>
					Playground
				</Link>
			</div>
			<div className={styles.title}>Lehinas Editor</div>
			<div className={styles.user}>
				<img src={profile_logo} alt="Avatar" className={styles.avatar}/>
				<span className={styles.username}>Lehinas</span>
			</div>
		</div>
	)
}

export default Navbar
