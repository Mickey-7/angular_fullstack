import { Component, OnInit } from "@angular/core";
import { TutorialService } from "src/app/service/tutorial.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-tutorial-details",
  template: `
    <!-- sbnippet : a-ngI -->
    <div *ngIf="currentTutorial">
      <label>Title :</label>
      <input [(ngModel)]="currentTutorial.title" type="text" />

      <label>Description :</label>
      <input [(ngModel)]="currentTutorial.description" type="text" />

      <label>Status :</label>
      {{ currentTutorial.published ? "Published" : "Pending" }}

      <!-- for delte -->
      <button (click)="delete()">Delete</button>

      <!-- for update -->
      <button (click)="updateTutorial()">Update</button>
      <p>{{ message }}</p>
    </div>

    <!-- if no selected currentTutorial -->
    <div *ngIf="!currentTutorial">
      <p>No Tutorial was currently selected</p>
    </div>
  `,
  styles: [],
})
export class TutorialDetailsComponent implements OnInit {
  //invoke service & ActivatedRoute to get the id param which was passed
  //when the edit button was click on tutorial-list component
  //also the Router to navigate to list after delete
  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //invoke the get tutorial with the selected id using ActivatedRoute
    this.getTutorial(this.route.snapshot.paramMap.get("id"));
    //id was from the url param
  }

  //currentTutorial var for storage and link bet. html and ts
  currentTutorial = null;

  // create the get tutorial method invoking service and catch error
  getTutorial(id) {
    this.tutorialService.get(id).subscribe(
      (response) => {
        console.log(response);
        //set the response data to the currentTutorial to be displayed
        this.currentTutorial = response;
      },
      //catch error
      (error) => {
        console.log(error);
      }
    );
  }

  //message for update notif
  message = "";

  //update method and invoke service then subscribe and catch error
  updateTutorial() {
    this.tutorialService
      .update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        (response) => {
          console.log(response);
          //notif message
          this.message = "Tutorial was udpated";
        },
        //catch error
        (error) => {
          console.log(error);
        }
      );
  }

  //delete method and invoke service then subsscribe thrn catch error
  //also after delte, wi will redirect it to tutorial-list component
  delete() {
    this.tutorialService.delete(this.currentTutorial.id).subscribe(
      (response) => {
        console.log(response);
        // redirect to /tutorials after delete
        this.router.navigate(["/tutorials"]);
      },
      //catch error
      (error) => {
        console.log(error);
      }
    );
  }
}
