import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CustomService, mPageService} from "@clinicaloffice/clinical-office-mpage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public mPage: mPageService,
    public baseService: CustomService
  ) { }

  public loading_data: boolean = false ;

  ngOnInit(): void {

    // // Grab any parameters in the URL (Used in Cerner Components)
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.mPage.personId = params.personId ? parseInt(params.personId) : this.mPage.personId;
    //   this.mPage.encntrId = params.encounterId ? parseInt(params.encounterId) : this.mPage.encntrId;
    //   this.mPage.prsnlId = params.userId ? parseInt(params.userId) : this.mPage.prsnlId;
    // });

    // Perform MPage Initialization
    setTimeout((e: any) => {
      this.mPage.setMaxInstances(2, true, 'CHART');

      // Add your initialization code here - do not place outside setTimeout function
      this.mPage.executeCCL ({
        payload: {
          patientSource: [{personId: 0, encntrId: 0}],
          person: { 
              patient: true,
              aliases: true,
          },
          encounter: { },
          problem: { }
        }
      })

      this.loading_data = true;
      this.baseService.load({
        customScript: {
          script: [
            {
                name: "1cov_base_development_01:group1",
                run: "pre",
                id: "base",
                parameters: ""
              }],
          clearPatientSource: false
        },
        person: {patient: true, prsnlReltn: true},
        encounter: {aliases: true, prsnlReltn: true},
        
      }, undefined, (() => { this.loading_data = false}));

    // Add your initialization code above here  - do not place outside setTimeout function
    }, 0);
  }

}
