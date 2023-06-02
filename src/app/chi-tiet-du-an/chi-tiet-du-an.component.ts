import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DetailService} from '../detail.service'

@Component({
  selector: 'app-chi-tiet-du-an',
  templateUrl: './chi-tiet-du-an.component.html',
  styleUrls: ['./chi-tiet-du-an.component.css']
})
export class ChiTietDuAnComponent implements OnInit {
  projectId: number = 1;
  project:any ;

  constructor(private route: ActivatedRoute, private projectService: DetailService) {}
  ngOnInit() {
    this.fetchContent()
  }
  fetchContent(){
    this.projectId = +(this.route.snapshot.paramMap.get('id') || 1);
    this.projectService.getProjectsByID(this.projectId).subscribe((project) => {
      this.project = project;
      console.log(this.project);
    });
  }
}
