import {Component, OnInit} from '@angular/core';
import {News} from '../models/news.model';
import {ActivatedRoute, Params} from '@angular/router';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  loadedNews: News[] = [];
  isLoadingNews = false;
  error = null;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getArticles();
  }

  private getArticles(): void {
    this.isLoadingNews = true;
    this.dataService.fetchArticles().subscribe(news => {
      this.isLoadingNews = false;
      this.loadedNews = news;
    }, error => {
      this.error = error.message;
    });
  }

}
