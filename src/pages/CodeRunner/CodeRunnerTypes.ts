
export interface ILanguage {
	label: string
	value: string
	template?: string
}

export interface IApiResponse {
	ran: boolean
	output: string
}

export enum Status {
	finished = "Finished",
	running = "Running...",
	err = "Error"
}