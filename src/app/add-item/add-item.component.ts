import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  myForm: FormGroup;

  myBoolean = false;
  platesList: any[];
  newOwner: string;
  newItem: object;
  randomNr = Math.random();

  constructor(private dataService: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (data: any[]) => {
        data.sort((a, b) => a.owner > b.owner ? 1 : -1);
        this.platesList = data;
      }
    );
    // validate form
    this.myForm = this.fb.group({
      newPlateNo: ['', [
        Validators.required,
        Validators.pattern('[A-Za-z]{3}[0-9]{3}')
      ]],
      newOwnerName: ['', [
        Validators.required
      ]]
    });
    
  }

  get newPlateNo() {
    return this.myForm.get('newPlateNo');
  }
  get newOwnerName() {
    return this.myForm.get('newOwnerName');
  }

  checkIfUnique() {    //check if the car plate is unique
    for (let i = 0; i < this.platesList.length; i++) {
      if (this.newPlateNo.value.toUpperCase() === this.platesList[i].plateNumber) {
        alert("Plate number " + this.newPlateNo.value.toUpperCase() + " already exists!");
        this.myBoolean = true;
        location.reload();
        break;
      }
   
    }
    if (!this.myBoolean) {
      this.addItem();
    }
  }

  addItem() {   //add new car to the database
    this.newOwner = this.titleCase(this.newOwnerName.value);
    this.newItem = {
      "id": this.randomNr,
      "plateNumber": this.newPlateNo.value.toUpperCase(),
      "owner": this.newOwner
    }
    this.dataService.addItem(this.newItem).subscribe();
    alert("New car added successfully!");
    this.router.navigate(['/']);
  }

  titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

}
