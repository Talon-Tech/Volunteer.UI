export class Opportunity {
    id: number | null = null;
    name!: string;
    date!: Date; 

    constructor(obj: any = null) {
		if (obj != null) {
			Object.assign(this, obj);
		}
	}
}