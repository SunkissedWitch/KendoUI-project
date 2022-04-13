export interface IValidation {
	[key: string]: string;
}

export interface IUser {
	user_name: string,
	first_name: string,
	last_name: string,
	full_name?: string,
	last_login?: string | Date,
	enabled: boolean | undefined,
}