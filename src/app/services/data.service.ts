import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firebase: AngularFireDatabase) {}

  usersList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    scientificName: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
    relatedTerms: new FormControl([
      {
        display: 'display',
        value: 'Add tag +',
        readonly: true
      }
    ]),
    broadTearms: new FormControl([
      {
        display: 'display',
        relatedTerms: 'Add tag +',
        readonly: true
      }
    ]),
    medicalLine: new FormControl('', Validators.required),
    rank: new FormControl(0),
    nonPreferdTerms: new FormControl([
      {
        display: 'display',
        value: 'Add tag +',
        readonly: true
      }
    ]),
    image: new FormControl({})
  });

  initializeForm() {
    this.form.setValue({
      $key: null,
      scientificName: '',
      name: '',
      speciality: '',
      relatedTerms: [
        {
          display: 'display',
          value: 'Add tag +',
          readonly: true
        }
      ],
      broadTearms: [
        {
          display: 'display',
          value: 'Add tag +',
          readonly: true
        }
      ],
      medicalLine: '',
      rank: 0,
      nonPreferdTerms: [
        {
          display: 'display',
          value: 'Add tag +',
          readonly: true
        }
      ],
      image: {}
    });
  }

  getUsers() {
    this.usersList = this.firebase.list('users');
    return this.usersList.snapshotChanges();
  }

  insertUser(user) {
    user.relatedTerms.shift();
    user.broadTearms.shift();
    user.nonPreferdTerms.shift();
    this.usersList.push({
      scientificName: user.scientificName,
      name: user.name,
      speciality: user.speciality,
      relatedTerms: user.relatedTerms,
      broadTearms: user.broadTearms,
      medicalLine: user.medicalLine,
      rank: user.rank,
      nonPreferdTerms: user.nonPreferdTerms,
      image: user.image
    });
  }

  updateUser(user) {
    this.usersList.update(user.$key, {
      scientificName: user.scientificName,
      name: user.name,
      speciality: user.speciality,
      relatedTerms: user.relatedTerms,
      broadTearms: user.broadTearms,
      medicalLine: user.medicalLine,
      rank: user.rank,
      nonPreferdTerms: user.nonPreferdTerms,
      image: user.image
    });
  }

  removeUser($key: string) {
    this.usersList.remove($key);
  }

  populateForm(user) {
    this.form.setValue(user);
  }
}
