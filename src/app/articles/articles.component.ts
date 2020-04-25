import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../services/article.service";
import {UserService} from "../services/user.service";
import {ArticlesModel} from "../models/articles.model";
import * as jwt_decode from 'jwt-decode';
import {delay} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: ArticlesModel[] = [];
  isLoading = false;
  userId: number;
  deletesArticles: number[];
  deletesArticlesClass: number[];

  constructor(public articlesService: ArticleService, private snackBar: MatSnackBar, public userService: UserService) {
  }

  ngOnInit() {
    this.deletesArticles = [];
    this.deletesArticlesClass = [];
    this.isLoading = true;
    this.userId = jwt_decode(localStorage.getItem('token')).id;
    this.articlesService.getArticles()
      .subscribe(articlesData => {
        this.isLoading = false;
        this.articles = articlesData;
        console.log(this.articles);
      });
  }

  onDelete(id: number) {
    this.deletesArticlesClass.push(id);
    setTimeout(() => {
      this.deletesArticles.push(id);
    }, 700);
    this.articlesService.deleteArticleById(id).subscribe(res => {
      this.snackBar.open('ARTICLE WAS DELETED');
    });
  }

  hide(id: number) {
    return !this.deletesArticles.includes(id);
  }
}

