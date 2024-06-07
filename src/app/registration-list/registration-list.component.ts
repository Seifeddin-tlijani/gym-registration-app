import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GymService } from '../services/gym.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {


  public dataSource!: MatTableDataSource<User>;
  public users!: User[];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'bmiResult', 'gender', 'package', 'enquiryDate', 'action'];


  constructor(private gym: GymService,
    private router: Router,
    private confirm: NgConfirmService) {



  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.gym.getRegistredUser().subscribe(
      res => {
        this.users = Array.isArray(res) ? res : [res];
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  edit(id: number) {
    this.router.navigate(['update', id])
  }
  deleteUser(id: number) {
    this.confirm.showConfirm(
      "Are you sure you want to delete?",
      () => {
        this.gym.deleteRegisteredUser(id).subscribe(
          res => {
            console.log('Deleted successfully', res);
            alert('Deleted successfully!');
          },
          err => {
            console.error('Error deleting user', err);
            alert('Failed to delete user. Please try again.');
          }
        );
      },
      () => {
        console.log('User deletion cancelled');
      }
    );
  }







}







