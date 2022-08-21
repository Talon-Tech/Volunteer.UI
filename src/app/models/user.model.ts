export class User {
	// guid!: string;	
	userId: number | null = null;
    username!: string;
	firstName!: string;
	lastName!: string;
	email!: string;
	password!: string;

	preferredWorkCenters: Array<string> | undefined = undefined;
    skillsOrInterests: Array<string>  | undefined = undefined;
    availabilityTimes: Array<string> | undefined = undefined;
    address: string  | null = null;
    phoneNumbers: Array<string>  | undefined = undefined;
    educationalBackground: string  | null = null;
    currentLicenses: Array<string> | undefined = undefined;
    emergencyContactName: string  | null = null;
    emergencyContactPhone: string  | null = null;
    emergencyContactEmail: string  | null = null;
    emergencyContactAddress: string  | null = null;
    hasLicense: boolean = false;
    hasSSN: boolean = false;
    approvalStatus: string  | null = null;

	constructor(obj: any = null) {
		if (obj != null) {
			Object.assign(this, obj);
		}
	}

	CompleteUser() {
        if (this.username && this.firstName.length > 0 && this.lastName.length > 0 && this.email.length > 0 && this.password.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    CompleteVolunteer(): boolean {
        if (
            this.CompleteUser() &&
            this.preferredWorkCenters &&
            this.skillsOrInterests &&
            this.availabilityTimes &&
            this.address &&
            this.phoneNumbers &&
            this.educationalBackground &&
            this.currentLicenses &&
            this.emergencyContactName &&
            this.emergencyContactPhone &&
            this.emergencyContactEmail &&
            this.emergencyContactAddress &&
            this.hasLicense &&
            this.hasSSN &&
            this.approvalStatus
        ) {
            return true;
        } else {
            return false
        }
	}
}