import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {News} from '../models/news.model';
import {map, catchError} from 'rxjs/operators';
import {Source} from '../models/source.model';
import {throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataService {
  apiKey = 'a85461c56bd14ef293dba176810107ed';
  apiArticles = 'https://newsapi.org/v2/everything?q=all%27%27&apiKey=' + this.apiKey;
  apiSources = 'https://newsapi.org/v2/sources?apiKey=' + this.apiKey;

  constructor(private http: HttpClient) {
  }

  fetchSources() {
    return this.http
      .get<{ status: string, sources: Source }>(this.apiSources)
      .pipe(map(res => {
          const convertedSources: Source[] = [];
          for (const key in res.sources) {
            if (res.sources.hasOwnProperty(key)) {
              convertedSources.push(res.sources[key]);
            }
          }
          return convertedSources;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  fetchArticles(source = '') {
    return this.http
      .get<{ status: string, totalResults: number, articles: News }>(this.apiArticles)
      .pipe(map(res => {
          const convertedArticles: News[] = [];
          for (const key in res.articles) {
            if (res.articles.hasOwnProperty(key)) {
              convertedArticles.push(res.articles[key]);
            }
          }
          if (source !== '') {
            return convertedArticles.filter(article => article.source.name === source);
          }
          return convertedArticles;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        }));
  }
}
