import React, {FC, useState} from "react"
import styles from "./CodeRunner.module.css"
import {Editor} from "@monaco-editor/react"
import BlockUI from "../../components/UI/BlockUI/BlockUI"
import {IApiResponse, ILanguage, Status} from "./CodeRunnerTypes"


const languages: ILanguage[] = [
	{
		label: "JavaScript",
		value: "javascript",
		template: `console.log("Hello, World!");`,
	},
	{
		label: "TypeScript",
		value: "typescript",
		template: `console.log("Hello, TypeScript!");`,
	},
	{
		label: "Python",
		value: "python",
		template: `print("Hello, World!")`,
	},
	{
		label: "C++",
		value: "cpp",
		template: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
	},
	{
		label: "Java",
		value: "java",
		template: `public class Main {
public static void main(String[] args) {
    System.out.println("Hello, World!");
}
}`,
	},
]


export enum CodeRunnerTypes {
	col = "column",
	row = "row",
}


interface CodeRunnerProps {
	type?: CodeRunnerTypes
}

const CodeRunner: FC<CodeRunnerProps> = ({type}) => {
	const [code, setCode] = useState<string | undefined>(languages[0].template)
	const [language, setLanguage] = useState<string>("javascript")
	const [output, setOutput] = useState<string>("")
	const [status, setStatus] = useState<Status>(Status.finished)

	const handleRun = async () => {
		try {
			setStatus(Status.running)
			// какой-то api который может выполнить код так еще без api ключа, круто и модно
			// в нём можно получить список поддерживаемых ЯП и их уже выводить для monaco(нужно
			// еще проверить совместимость но всё же), но думаю это не столь важно
			const response = await fetch("https://emkc.org/api/v1/piston/execute", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					language: language,
					source: code,
				}),
			})
			const data: IApiResponse = await response.json()
			if (data.ran) {
				setOutput(data.output || "No output")
				setStatus(Status.finished)
			} else {
				setOutput(data.output)
				setStatus(Status.err)
			}
		} catch (error) {
			setOutput("Failed to execute code. Please check your input.")
			setStatus(Status.err)
		}
	}
	const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedLanguage = e.target.value
		setLanguage(selectedLanguage)

		const template = languages.find(lang => lang.value === selectedLanguage)?.template || ""
		setCode(template)
	}

	const handleEditorChange = (value: string | undefined) => {
		if (value) {
			setCode(value)
		}
	}

	const clearConsole = () => {
		setOutput("")
	}

	return (
		<div className={`${styles.CodeRunner} ${type === CodeRunnerTypes.col ? styles.CodeRunner_column : ""}`}>
			<div className={`${styles.blocks} ${type === CodeRunnerTypes.col ? styles.column : ""}`}>
				<BlockUI>
					<div className={styles.settings}>
						<select
							className={styles.languageSelector}
							value={language}
							onChange={handleLanguageChange}
						>
							{languages.map((lang) => (
								<option key={lang.value} value={lang.value}>
									{lang.label}
								</option>
							))}
						</select>
						<button className={styles.runButton} onClick={handleRun}>Run Code</button>
					</div>
					<Editor
						language={language}
						value={code}
						theme="vs-dark"
						onChange={handleEditorChange}
						options={
							{
								minimap: {enabled: false},
								overviewRulerLanes: 0,
							}
						}
					/>
				</BlockUI>
				<BlockUI>
					<div className={styles.settings}>
						<span className={styles.status}>
							Output:
							<span
								className={
									status === Status.finished
										? styles.finished
										: status === Status.err
											? styles.error
											: status === Status.running
												? styles.running
												: ""
								}
							>
								{status}
							</span>
						</span>
						<button className={styles.clearButton} onClick={clearConsole}>
							Clear Console
						</button>
					</div>
					<pre className={styles.output}>{output}</pre>
				</BlockUI>
			</div>
		</div>
	)
}

export default CodeRunner
