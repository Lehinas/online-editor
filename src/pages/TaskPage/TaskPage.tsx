import React, {FC} from "react"
import styles from "./TaskPage.module.css"
import {useParams} from "react-router"
import {ITask} from "../TaskList/TaskList"
import BlockUI from "../../components/UI/BlockUI/BlockUI"
import CodeRunner, {CodeRunnerTypes} from "../CodeRunner/CodeRunner"

const tasks: ITask[] = [
	{
		id: 1,
		title: "Two Sum",
		difficulty: "Easy",
		description: "Найти два числа с заданной суммой.",
	},
	{
		id: 2,
		title: "Longest Substring Without Repeating Characters",
		difficulty: "Medium",
		description: "Найти самую длинную подстроку без повторов.",
	},
]

const TaskPage: FC = () => {
	const {id} = useParams<{ id: string }>()
	const task = tasks.find((t) => t.id === Number(id)) as ITask | undefined

	if (!task) {
		return <div className={styles.TaskPage}>Задача не найдена</div>
	}

	return (
		<div className={styles.TaskPage}>
			<BlockUI className={styles.block}>
				<h1 className={styles.title}>{task.id}. {task.title}</h1>
				<div className={styles.tags}>
					<div className={`${styles.tag} ${styles[task.difficulty.toLowerCase()]}`}>
						{task.difficulty}
					</div>
				</div>
				<p className={styles.description}>{task.description}</p>
				<div>
					<div className={styles.codeblockText}>Input:</div>
					<div className={styles.codeblock}>Some input</div>
				</div>
				<div>
					<div className={styles.codeblockText}>Output:</div>
					<div className={styles.codeblock}>Some output</div>
				</div>
			</BlockUI>
			<CodeRunner type={CodeRunnerTypes.col}/>
		</div>
	)
}

export default TaskPage
