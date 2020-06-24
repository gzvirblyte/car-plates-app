import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  term: string = "";
  platesList = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // get data from database
    this.dataService.getData().subscribe(
      (data: any[]) => {
        data.sort((a, b) => a.owner > b.owner ? 1 : -1);
        this.platesList = data;
      }
    );
  }

  onDelete(plate) { // delete item from the database
    if (confirm('Are you sure you want to delete this record?')) {
      this.dataService.deleteItem(plate.id).subscribe();
      this.platesList = this.platesList.filter(i => i.id !== plate.id);
    }
  }

}
