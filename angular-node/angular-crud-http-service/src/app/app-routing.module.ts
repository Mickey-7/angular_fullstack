import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddTutorialComponent } from "./components/add-tutorial/add-tutorial.component";
import { TutorialDetailsComponent } from "./components/tutorial-details/tutorial-details.component";
import { TutorialListComponent } from "./components/tutorial-list/tutorial-list.component";

const routes: Routes = [
  { path: "", redirectTo: "tutorials", pathMatch: "full" },
  { path: "add", component: AddTutorialComponent },
  { path: "tutorials", component: TutorialListComponent },
  { path: "tutorials/:id", component: TutorialDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
