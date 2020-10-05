import {Component, OnInit} from '@angular/core';
import {News} from '../models/news.model';
import {ActivatedRoute, Params} from '@angular/router';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
})
export class ArticlesComponent implements OnInit {
  filteredNews: News[] = [];
  isLoadingNews = false;
  error = null;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.getArticles(params['id']);
      }
    );
  }

  private getArticles(source): void {
    this.isLoadingNews = true;
    this.dataService.fetchArticles(source).subscribe(news => {
      this.isLoadingNews = false;
      this.filteredNews = news;
    }, error => {
      this.error = error.message;
    });
  }

}
