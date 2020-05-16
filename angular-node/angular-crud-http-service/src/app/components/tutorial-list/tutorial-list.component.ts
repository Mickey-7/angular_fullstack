import { Component, OnInit } from "@angular/core";
import { TutorialService } from "src/app/service/tutorial.service";

@Component({
  selector: "app-tutorial-list",
  template: `
    <!-- for search  -->
    <!-- snippet : a-ngM -->
    <input [(ngModel)]="title" type="text" />
    <button (click)="searchTitle()">Search</button>

    <!-- display tutorials -->
    <h3>Tutorial List</h3>
    <ol>
      <!-- snippet : a-ngF -->
      <!-- invoke the setActiveTutorial method on ts here and pass the tutoraial data-->
      <li
        *ngFor="let tutorial of tutorials; let i = index"
        (click)="setActiveTutorial(tutorial, i)"
      >
        {{ tutorial.title }}
      </li>
    </ol>

    <!-- remove all button -->
    <button (click)="removeAll()">Remove All</button>

    <!-- for displayiong the selected tutorail -->
    <!-- snippet : a-ngI -->
    <div *ngIf="currentTutorial">
      <h3>Selected Tutorial</h3>
      <label>Title : </label>
      {{ currentTutorial.title }}

      <label>Description : </label>
      {{ currentTutorial.description }}

      <label>Status : </label>
      {{ currentTutorial.published ? "Published" : "Pending" }}

      <!-- link for edit -->
      <a
        href="/tutorials/{{ currentTutorial.id }}"
        routerLinkActive="router-link-active"
      >
        Edit
      </a>
    </div>

    <!-- will render if no tutorial was selected -->
    <div *ngIf="!currentTutorial">
      <p>Please clucick in tutorial to select</p>
    </div>
  `,
  styles: [],
})
export class TutorialListComponent implements OnInit {
  // invoke service
  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    //invoke the retireve aemthod to displat all tutorail right from the start
    this.retrieveTutorials();
  }

  //create tutorials var for storage and link between html & ts file
  tutorials: any;

  // create method and invoke service then subscribe and catch error
  retrieveTutorials() {
    this.tutorialService.getAll().subscribe(
      (response) => {
        console.log(response);
        //set the response to the tutorials data to be displayed
        this.tutorials = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //create title var with empty string for storge and link bet. html serachbox and ts
  title: "";

  // create serach method and invoke service then subscribe and catch error
  searchTitle() {
    this.tutorialService.findByTitle(this.title).subscribe(
      (response) => {
        console.log(response);
        //set the tutorials to be displayed on the filtered by title response data
        this.tutorials = response;
      },
      //catch error
      (error) => {
        console.log(error);
      }
    );
  }

  //method for remova all
  removeAll() {
    this.tutorialService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        //call the get all method after delete
        this.retrieveTutorials();
      },
      // catch error
      (error) => {
        console.log(error);
      }
    );
  }

  // create var for selected tutorial
  currentTutorial = null;
  currentIndex = -1;

  // for selected tutorial
  setActiveTutorial(tutorial, index) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }
}
