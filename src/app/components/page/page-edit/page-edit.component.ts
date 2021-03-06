import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service.client';
import { Page } from 'src/app/models/page.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  uid : string;
  wid : string;
  pid : string;
  page : Page = {
    name: "", 
    websiteId: "", 
    title: "" 
  };

  constructor(private activatedRoute : ActivatedRoute, private pageService : PageService, private router : Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.uid = params['uid'];
      this.wid = params['wid'];
      this.pid = params['pid'];
    });
    this.pageService.findPageById(this.pid).subscribe(
      (page : Page) => {
        this.page = page
      }
    )
  }

  update() {
    this.pageService.updatePage(this.page).subscribe(
      (page : Page) => {
        this.router.navigate(['user', this.uid, 'website', this.wid, 'page']);
      }
    );
  }

  delete() {
    this.pageService.deletePage(this.pid).subscribe(
      (page : Page) => {
        this.router.navigate(['user', this.uid, 'website', this.wid, 'page']);
      }
    );
  }

}
