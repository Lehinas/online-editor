import React, {FC, ReactNode} from "react"
import styles from "./BlockUI.module.css"

interface IBlockUIProps {
	children: ReactNode;
	className?: string;
}

const BlockUI: FC<IBlockUIProps> = ({children, className}) => {
	return (
		<div className={`${styles.block} ${className || ""}`}>
			{children}
		</div>
	)
}

export default BlockUI
