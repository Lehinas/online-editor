import React, {FC} from "react"
import styles from "./TaskList.module.css"
import {Link} from "react-router"

export interface ITask {
	id: number
	title: string
	difficulty: "Easy" | "Medium" | "Hard"
	description: string
}

const tasks: ITask[] = [
	{
		id: 1,
		title: "Two Sum",
		difficulty: "Easy",
		description: "Найти два числа с заданной суммой."
	},
	{
		id: 2,
		title: "Longest Substring Without Repeating Characters",
		difficulty: "Medium",
		description: "Найти самую длинную подстроку без повторов."
	},
]

const TaskList: FC = () => {
	return (
		<div className={styles.taskList}>
			<h2 className={styles.title}>LeetCode Tasks</h2>
			<ul className={styles.list}>
				{tasks.map((task) => (
					<li key={task.id} className={styles.task}>
						<span className={styles.taskNumber}>{task.id}</span>
						<Link to={`task/${task.id}`} className={styles.taskTitle}>{task.title}</Link>
						<span
							className={`${styles.difficulty} 
							${styles[task.difficulty.toLowerCase()]}`}
						>
							{task.difficulty}
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TaskList
