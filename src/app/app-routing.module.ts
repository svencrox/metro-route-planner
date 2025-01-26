import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MetroComponent } from "./metro/metro.component";

const routes: Routes = [{ path: "", component: MetroComponent }];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
