import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { GymService } from '../services/gym.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {


  public userID!: number;
  userDetail!: User;

  constructor(private activatedRoute: ActivatedRoute,
    private gym: GymService
  ) {

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userID = val['id'];
      this.fetchUserDetails(this.userID);
    })
  }



  fetchUserDetails(userID: number) {
    this.gym.getRegisteredUserId(this.userID).subscribe(res => {
      this.userDetail = res;
      console.log(this.userDetail);
    })
  }

}
