import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  isVolunteer: boolean = false;
  isAdmin: boolean = false;

  editedUser: User | null = null;

  preferredWorkCenters?: Array<string>;
  skillsOrInterests?: Array<string>;
  availabilityTimes?: Array<string>;
  address?: string;
  phoneNumbers?: Array<string>;
  educationalBackground?: string;
  currentLicenses?: Array<string>;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactEmail?: string;
  emergencyContactAddress?: string;
  hasLicense?: boolean;
  hasSSN?: boolean
  approvalStatus?: string;

  error = false;
  errorMsg = '';

  roles: Array<string> | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authSvc: AuthService,
    private router: Router
  ) { 
    let token = this.authSvc.GetCurrentUser();
    if (!token) {
      this.editedUser = null;
      this.roles = null;
    } else {
      this.editedUser = token.UserData;
      this.roles = token.Roles;
      this.isAdmin = token.Roles.includes("Admin") ? true: false;
      this.isVolunteer = token.Roles.includes("Volunteer") ? true: false;
    }
  }

  userId: number | null = null;

  isShowingAddPrefference: boolean = false;
  isShowingAddAvailabilityTimes: boolean = false;
  isShowingAddSkillsOrInterests: boolean = false;
  isShowingAddPhoneNumbers: boolean = false;
  isShowingAddCurrentLicenses: boolean = false;
  
  addedPreferrence: string | null = null;
  addedSkillOrInterest: string | null = null;
  addedAvailabilityTime: string | null = null;
  addedPhoneNumber: string | null = null;
  addedCurrentLicense: string | null = null;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((p) => {
      this.userId = p['userId'];
    });
  }

  EditUser() {
    // if (this.newUser?.userId == null || this.newUser?.firstName == '' || this.newUser?.lastName == '' || this.newUser?.email == '' || this.newUser?.password == '') {
    if (this.editedUser?.firstName == '' || this.editedUser?.lastName == '' || this.editedUser?.email == '' || this.editedUser?.password == '') {
      this.error = true;
      this.errorMsg = "Please complete the required information";
    } else {
      // console.log("Test");
      // console.log(this.newUser);
      this.authSvc.EditUser(this.editedUser as User).subscribe({
        next: (r) => this.router.navigate(['/users']),
        error: (e) => { this.error = true, this.errorMsg = e.error.message }
      });
    }
  }

  setIsShowingAddPreferrences(flag: boolean) {
    this.isShowingAddPrefference = flag;
  }

  setIsShowingAddAvailabilityTimes(flag: boolean) {
    this.isShowingAddAvailabilityTimes = flag;
  }

  setIsShowingAddSkillsOrInterests(flag: boolean) {
    this.isShowingAddSkillsOrInterests = flag;
  }

  setIsShowingAddPhoneNumbers(flag: boolean) {
    this.isShowingAddPhoneNumbers = flag;
  }

  setIsShowingAddCurrentLicenses(flag: boolean) {
    this.isShowingAddCurrentLicenses = flag;
  }

  CreatePreferrence() {
    if (this.addedPreferrence && this.addedPreferrence.length > 0) {
      if(!this.preferredWorkCenters) {
        this.preferredWorkCenters = [];
      }
      this.preferredWorkCenters.push(this.addedPreferrence);
      this.addedPreferrence = null;
      this.setIsShowingAddPreferrences(false);
    }
  }

  DeletePreferrence(itemToDelete: string) {
    if(this.preferredWorkCenters) {
      this.preferredWorkCenters = this.preferredWorkCenters.filter(item => item !== itemToDelete);
    }
  }

  CreateAvailabilityTime() {
    if (this.addedAvailabilityTime && this.addedAvailabilityTime.length > 0) {
      if(!this.availabilityTimes) {
        this.availabilityTimes = [];
      }
      this.availabilityTimes.push(this.addedAvailabilityTime);
      this.addedPreferrence = null;
      this.setIsShowingAddAvailabilityTimes(false);
    }
  }

  DeleteAvailabilityTime(itemToDelete: string) {
    if(this.availabilityTimes) {
      this.availabilityTimes = this.availabilityTimes.filter(item => item !== itemToDelete);
    }
  }

  CreateSkillOrInterest() {
    if (this.addedSkillOrInterest && this.addedSkillOrInterest.length > 0) {
      if(!this.skillsOrInterests) {
        this.skillsOrInterests = [];
      }
      this.skillsOrInterests.push(this.addedSkillOrInterest);
      this.addedPreferrence = null;
      this.setIsShowingAddPreferrences(false);
    }
  }

  DeleteSkillOrInterest(itemToDelete: string) {
    if(this.skillsOrInterests) {
      this.skillsOrInterests = this.skillsOrInterests.filter(item => item !== itemToDelete);
    }
  }

  CreatePhoneNumber() {
    if (this.addedPhoneNumber && this.addedPhoneNumber.length > 0) {
      if(!this.phoneNumbers) {
        this.phoneNumbers = [];
      }
      this.phoneNumbers.push(this.addedPhoneNumber);
      this.addedPreferrence = null;
      this.setIsShowingAddPreferrences(false);
    }
  }

  DeletePhoneNumber(itemToDelete: string) {
    if(this.phoneNumbers) {
      this.phoneNumbers = this.phoneNumbers.filter(item => item !== itemToDelete);
    }
  }

  CreateCurrentLicense() {
    if (this.addedCurrentLicense && this.addedCurrentLicense.length > 0) {
      if(!this.currentLicenses) {
        this.currentLicenses = [];
      }
      this.currentLicenses.push(this.addedCurrentLicense);
      this.addedPreferrence = null;
      this.setIsShowingAddPreferrences(false);
    }
  }

  DeleteCurrentLicense(itemToDelete: string) {
    if(this.currentLicenses) {
      this.currentLicenses = this.currentLicenses.filter(item => item !== itemToDelete);
    }
  }

}
