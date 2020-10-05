import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Source} from '../models/source.model';
import {News} from '../models/news.model';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  sources: Source[] = [];
  isFetchingSources = false;
  error = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getSources();
  }

  private getSources(): void {
    this.isFetchingSources = true;
    this.dataService.fetchSources().subscribe(sourcesRes => {
      this.isFetchingSources = false;
      this.sources = sourcesRes;
    }, error => {
      this.error = error.message;
    });
  }
}
