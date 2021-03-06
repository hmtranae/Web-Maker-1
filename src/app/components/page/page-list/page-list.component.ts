import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service.client';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/models/page.model.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  pages : Page[];
  wid : string;
  uid : string;
  
  constructor(private pageService : PageService, private activatedRoute : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.wid = params['wid'];
      this.uid = params['uid'];
      this.pageService.findPagesByWebsiteId(this.wid).subscribe(
        (pages : Page[]) => {
          this.pages = pages
        })
      // this.pages = this.pageService.findPagesByWebsiteId(this.wid);
    })
  }

}
