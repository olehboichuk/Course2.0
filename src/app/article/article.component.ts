import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ArticleService} from "../services/article.service";
import {ArticlesModel} from "../models/articles.model";
import * as jwt_decode from 'jwt-decode';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  private loading = false;
  private err = false;
  private articleId: string;
  private article: ArticlesModel;
  private isMyProfile: boolean;
  userId: number;
  private content: any;

  constructor(private sanitizer: DomSanitizer,private snackBar: MatSnackBar, private router: Router, public articlesService: ArticleService, public userService: UserService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isMyProfile=false;
    this.loading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('articleId')) {
        this.articleId = paramMap.get('articleId');
        this.articlesService.getArticleById(+this.articleId).subscribe(res => {
          console.log(res[0]);
          this.article = res[0];
          this.content = this.sanitizer.bypassSecurityTrustHtml(this.article.contents);
          this.userId = jwt_decode(localStorage.getItem('token')).id;
          if (this.article.id_author==this.userId) {
            this.isMyProfile=true;
          }
          this.loading = false;

        },error => {
          this.loading = false;
          this.err = true;
          this.snackBar.open(error.error.message,'',{
            duration: 20000,
          });
        });
      }
    });
  }

  onEdit() {
    this.router.navigate(['/create-article',this.article.id]);
  }

  onDelete() {
    this.articlesService.deleteArticleById(this.article.id).subscribe(res => {
      this.router.navigate(['/article-list']);
      this.snackBar.open('ARTICLE WAS DELETED');
    });
  }
}
