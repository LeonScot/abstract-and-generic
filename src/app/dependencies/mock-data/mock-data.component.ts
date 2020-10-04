import { Component, OnInit } from '@angular/core';
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'app-mock-data',
  templateUrl: './mock-data.component.html',
  styleUrls: ['./mock-data.component.css']
})
export class MockDataComponent implements OnInit {

  constructor(private mockDataService: MockDataService) { }

  ngOnInit(): void {
    // this.mockDataService.init();
    // this.mockDataService.fakeField();
    
    console.log(this.mockDataService.fieldOwnData());
    
  }

}
