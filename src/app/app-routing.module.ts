import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'add-item', component: AddItemComponent},
  { path: 'update-item/:id', component: UpdateItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
