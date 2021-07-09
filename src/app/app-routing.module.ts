import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { RecipeDetailComponent } from "./recipe/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe/recipe-start/recipe-start.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { RedirectComponent } from "./redirect/redirect.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRouting:Routes = [
    {path:'', redirectTo:'/recipe', pathMatch:'full'},
    {path:'recipe', component:RecipeComponent, 
    canActivate:[AuthGuard],
    children:[
        {path:'', component:RecipeStartComponent},
        {path:'new', component:RecipeEditComponent},
        {path:':id', component:RecipeDetailComponent},
        {path:':id/edit', component:RecipeEditComponent}
    ]},
    {path:'shopping-list', component: ShoppingListComponent},
    {path:'redirect', component: RedirectComponent},
    {path:'auth', component: AuthComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRouting)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}