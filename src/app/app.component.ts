import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'offline-support-demo';

  userData = {
    firstName: "",
    lastName: "",
    gender: "",
    nationality: "",
    department: ""
  }

  rows = [];
  columns=[
    { name:"Name", prop:"name" },
    { name:"Gender", prop:"gender" },
    { name:"Nationality", prop:"nationality" },
    { name:"Department", prop:"department" }
  ]

  constructor(
    private fireStore: AngularFirestore
  ) {}

  ngOnInit() {
    this.syncUsers();
  }

  syncUsers() {
    this.getUsers().subscribe(result => {
      this.rows = result.map(p => {
        p["name"] = p["firstName"]+" "+p["lastName"];
        p["gender"] = p["gender"];
        p["nationality"] = p["nationality"];
        p["department"] = p["department"];

        return p;
      });
    });
  }

  getUsers() {
    return this.fireStore.collection("users").valueChanges() as Observable<any[]>
  }


  addUser() {
    const params = {
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      gender: this.userData.gender,
      nationality: this.userData.nationality,
      department: this.userData.department
    }

    this.fireStore.collection("users").add(params);

    alert("User added successfully!");

    this.userData = {
      firstName: "",
      lastName: "",
      gender: "",
      nationality: "",
      department: ""
    };
  }


}
