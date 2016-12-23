import {Article} from "./Article";

export class ArticleDisplayContainer {
  article: Article;
  editMode: boolean;


  constructor(article: Article) {
    this.article = article;
    this.editMode = false;
  }
}

