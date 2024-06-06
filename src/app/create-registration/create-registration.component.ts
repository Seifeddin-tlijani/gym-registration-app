import { Component } from '@angular/core';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent {
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


  ]



}
