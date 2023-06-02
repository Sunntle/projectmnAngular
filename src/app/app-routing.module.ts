import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChiTietDuAnComponent } from './chi-tiet-du-an/chi-tiet-du-an.component';
import { DuanListComponent } from './duan-list/duan-list.component';
import { DuanThemComponent } from './duan-them/duan-them.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskThemComponent } from './task-them/task-them.component';
import { NvListComponent } from './nv-list/nv-list.component';
import { SearchComponent } from './search/search.component';
import { NvThemComponent } from './nv-them/nv-them.component';
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'chitietduan/:id', component: ChiTietDuAnComponent },
  { path: 'danhsachduan', component: DuanListComponent },
  { path: 'themduan', component: DuanThemComponent },
  { path: 'dstask', component: TaskListComponent },
  { path: 'themtask', component: TaskThemComponent },
  { path: 'dsnhanvien', component: NvListComponent },
  { path: 'search', component: SearchComponent },
  { path: 'themnv', component: NvThemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
