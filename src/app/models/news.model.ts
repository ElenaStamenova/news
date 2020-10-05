import { NewsSource } from './news-source.model';

export interface News {
  source: NewsSource;
  sourceName: string;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
