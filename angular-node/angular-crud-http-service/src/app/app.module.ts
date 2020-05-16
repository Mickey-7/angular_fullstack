import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddTutorialComponent } from "./components/add-tutorial/add-tutorial.component";
import { TutorialListComponent } from "./components/tutorial-list/tutorial-list.component";
import { TutorialDetailsComponent } from "./components/tutorial-details/tutorial-details.component";

//
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialListComponent,
    TutorialDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
