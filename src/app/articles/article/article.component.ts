import {Component, Input} from '@angular/core';
import {News} from '../../models/news.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styles: ['.card{ margin-bottom: 10px;}']
})
export class ArticleComponent {
  @Input() article: News;
}
