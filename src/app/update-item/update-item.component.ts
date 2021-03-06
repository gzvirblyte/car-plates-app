// import { Component, OnInit } from '@angular/core';
// import { DataService } from '../data.service';
// import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-update-item',
//   templateUrl: './update-item.component.html',
//   styleUrls: ['./update-item.component.scss']
// })
// export class UpdateItemComponent implements OnInit {

//   plate: any;
//   newPlate: string = "";
//   newOwner: string = "";
//   newItem: object;

//   constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

//   ngOnInit(): void {
//     // get selected item's id
//     let id = this.route.snapshot.paramMap.get('id');
//     this.dataService.getItem(id).subscribe(
//       (data) =>
//         this.plate = data
//     );
//   }

//   onUpdate() {
//     this.newOwner = this.titleCase(this.newOwner);
//     this.newItem = {
//       "id": this.plate.id,
//       "plateNumber": this.newPlate.toUpperCase(),
//       "owner": this.newOwner
//     }
//     console.log(this.newItem)
//     this.dataService.updateItem(this.newItem, this.plate.id).subscribe();
//     alert("Car updated successfully!");
//     this.router.navigate(['/']);
//   }

//   titleCase(str) {
//     str = str.toLowerCase().split(' ');
//     for (var i = 0; i < str.length; i++) {
//       str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
//     }
//     return str.join(' ');
//   }
// }


import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {

  myForm: FormGroup;

  plate: any;
  platesList: any[];
  newOwner: string;
  newItem: object;
  randomNr = Math.random();

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
        // get selected item's id
    let id = this.route.snapshot.paramMap.get('id');
    this.dataService.getItem(id).subscribe(
      (data) =>
        this.plate = data
    );
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

  onUpdate() {   //add new car to the database
    this.newOwner = this.titleCase(this.newOwnerName.value);
    this.newItem = {
      "id":this.plate.id,
      "plateNumber": this.newPlateNo.value.toUpperCase(),
      "owner": this.newOwner
    }
    this.dataService.updateItem(this.newItem, this.plate.id).subscribe();
    alert("Car updated successfully!");
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
