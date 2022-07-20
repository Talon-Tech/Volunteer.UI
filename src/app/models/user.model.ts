export class User {
	// guid!: string;	
	userId!: number;
	firstName!: string;
	lastName!: string;
	email!: string;
	password!: string;

	constructor(obj: any = null) {
		if (obj != null) {
			Object.assign(this, obj);
		}
	}
}