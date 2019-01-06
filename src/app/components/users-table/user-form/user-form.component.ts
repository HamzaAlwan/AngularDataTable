import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { DataService } from 'src/app/services/data.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  constructor(
    public service: DataService,
    public notification: NotificationsService,
    private dialogRef: MatDialogRef<UserFormComponent>
  ) {}

  specialities = [
    { value: 'Speciality 1' },
    { value: 'Speciality 2' },
    { value: 'Speciality 3' }
  ];

  medicalLines = [
    { value: 'Medical Line 1' },
    { value: 'Medical Line 2' },
    { value: 'Medical Line 3' }
  ];

  // Save image file, type and name;
  image;
  imageName;
  imageBinary;
  imageType;

  // Upload the image and convert it to binary
  getImage(event) {
    this.imageType = event.target.files[0].type;
    this.imageName = event.target.files[0].name;
    this.image = event.target.files;
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.image[0]);
  }

  handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.imageBinary = btoa(binaryString);
  }

  ngOnInit() {
    this.service.getUsers();
  }

  Clear() {
    this.service.form.reset();
    this.service.initializeForm();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (this.service.form.value.image) {
        this.service.form.value.image.name = this.imageName;
        this.service.form.value.image.data = this.imageBinary;
        this.service.form.value.image.type = this.imageType;
      }

      if (!this.service.form.get('$key').value) {
        this.service.insertUser(this.service.form.value);
      } else {
        this.service.updateUser(this.service.form.value);
      }
      this.service.form.reset();
      this.service.initializeForm();
      this.notification.success(':: Submitted Successfully ::');
      this.Close();
    }
  }

  Close() {
    this.service.form.reset();
    this.service.initializeForm();
    this.dialogRef.close();
  }
}
