import { Component, OnInit } from "@angular/core";
import { TutorialService } from "src/app/service/tutorial.service";

@Component({
  selector: "app-add-tutorial",
  template: `
    <div>
      <label>Title</label>
      <!-- snippet a-ngM -->
      <input [(ngModel)]="tutorial.title" type="text" />
      <br />
      <label>Description</label>
      <input [(ngModel)]="tutorial.description" type="text" />
      <button (click)="saveTutorial()">Submit</button>

      <!-- snippet : a-ngI -->
      <div *ngIf="submitted">
        <h3>Added Successfully!</h3>
        <button (click)="newTutorial()">Add</button>
      </div>
    </div>
  `,
  styles: [],
})
export class AddTutorialComponent implements OnInit {
  // invoke service
  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {}

  // create tutorial object which will like between html and ts file
  tutorial = {
    title: "",
    description: "",
    published: false,
  };
  // boolean type var for toggling/adding new tutorial again
  // and also for showing feedback/notification message
  submitted = false;

  // create save method and invoke service
  saveTutorial() {
    // storing the input data to single ata object
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
    };

    // invoking service the subscribe and catch if error
    this.tutorialService.create(data).subscribe(
      (response) => {
        console.log(response);
        // invoke submitted var to display notif message
        this.submitted = true;
      },
      // cathcing error
      (error) => {
        console.log(error);
      }
    );
  }

  // method for new tutorial addition
  newTutorial() {
    //invoke submitted var to false to remove notif message
    this.submitted = false;
    // lear input fields
    this.tutorial = {
      title: "",
      description: "",
      published: false,
    };
  }
}
