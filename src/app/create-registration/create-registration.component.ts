import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GymService } from '../services/gym.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ["Monthly", "Quarterly", "Yearly"];
  public genders = ["Male", "Female"]
  public importantList: string[] = [

    "Fitness",
    "Gym",
    "Bodybuilding",
    "Strength Training",
    "Weightlifting",
    "Powerlifting",
    "Muscle Building",
    "Resistance Training",
    "Muscle Gym",
    "Training Center",
    "Fitness Studio",
    "Workout Gym",
    "Weight Training",
    "Muscle Fitness",
    "Body Sculpting",
    "Strength Gym",
    "Strength Studio",
    "Musculation Center"


  ];



  public registerForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private gym: GymService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: ['']

    });

    this.registerForm.controls['height'].valueChanges.subscribe(
      res => {
        this.calculateBmi(res);
      }
    )
    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      this.gym.getRegisteredUserId(this.userIdToUpdate).subscribe(
        res => {
          this.isUpdateActive = true;
          this.fillFormToUpdate(res);
        })
    })

  }

  submit() {
    this.gym.postRegistration(this.registerForm.value).subscribe(
      res => {
        console.log('Registration successful', res);
        alert('Registration successful!');
        this.registerForm.reset();
      },
      err => {
        console.error('Error during registration', err);
        alert('Registration failed. Please try again.');
      }
    );
  }

  update() {
    this.gym.updateRegisterUser(this.registerForm.value, this.userIdToUpdate).subscribe(
      res => {
        console.log('updating successful', res);
        this.registerForm.reset();
        this.router.navigate(['list'])


      }
    )
  }




  calculateBmi(heightValue: number) {
    const weight = this.registerForm.value.height;
    const height = heightValue;
    const bmi = weight / (height * weight);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {

      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case (bmi > 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue("Overweight");
        break;

      default:
        this.registerForm.controls['bmiResult'].patchValue("Fat");
        break;






    }
  }

  fillFormToUpdate(user: User) {
    this.registerForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate

    })

  }






}
