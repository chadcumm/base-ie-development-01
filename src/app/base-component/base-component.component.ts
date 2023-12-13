import { Component, OnInit } from '@angular/core';
import { CustomService } from '@clinicaloffice/clinical-office-mpage';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss']
})
export class BaseComponentComponent implements OnInit {

  constructor(
    public bS: CustomService,
  ) { 
  
  }

  ngOnInit(): void {
  }

}
