import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotepadComponent } from './components/notepad/notepad.component';


const routes: Routes = [
  {
    path: 'notepad',
    component: NotepadComponent
  },
  {
    path: '',
    redirectTo: '/notepad',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
