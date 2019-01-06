import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  constructor(
    private users: DataService,
    private dilaog: MatDialog,
    private notifications: NotificationsService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  usersList: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'scientificName',
    'name',
    'speciality',
    'relatedTerms',
    'broadTearms',
    'medicalLine',
    'rank',
    'nonPreferdTerms',
    'image',
    'actions'
  ];
  searchKey: string;

  ngOnInit() {
    this.users.getUsers().subscribe(list => {
      const array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.usersList = new MatTableDataSource(array);
      this.usersList.sort = this.sort;
      this.usersList.paginator = this.paginator;
    });
  }

  searchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.usersList.filter = this.searchKey.trim().toLowerCase();
  }

  Create() {
    this.users.initializeForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dilaog.open(UserFormComponent, dialogConfig);
  }

  onEdit(row) {
    this.users.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dilaog.open(UserFormComponent, dialogConfig);
  }

  onDelete($key) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users.removeUser($key);
      this.notifications.delete(':: Deleted Successfully::');
    }
  }
}
