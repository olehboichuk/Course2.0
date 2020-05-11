import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ArticleService} from '../services/article.service';
import {ArticlesModel} from '../models/articles.model';
import * as jwt_decode from 'jwt-decode';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public loading = false;
  public err = false;
  public articleId: string;
  public article: ArticlesModel;
  public isMyProfile: boolean;
  public userId: number;
  public content: any;

  constructor(private sanitizer: DomSanitizer, private snackBar: MatSnackBar,
              private router: Router, public articlesService: ArticleService,
              public userService: UserService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isMyProfile = false;
    this.loading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('articleId')) {
        this.articleId = paramMap.get('articleId');
        this.articlesService.getArticleById(+this.articleId).subscribe(res => {
          this.article = res[0];
          this.content = this.sanitizer.bypassSecurityTrustHtml(this.article.contents);
          this.userId = jwt_decode(localStorage.getItem('token')).id;
          if (this.article.id_author === this.userId) {
            this.isMyProfile = true;
          }
          this.loading = false;
        }, error => {
          this.loading = false;
          this.err = true;
          this.snackBar.open(error.error.message, '', {
            duration: 20000,
          });
        });
      }
    });
  }

  onEdit() {
    this.router.navigate(['/edit-article', this.article.id]);
  }

  onDelete() {
    this.articlesService.deleteArticleById(this.article.id).subscribe(res => {
      this.router.navigate(['/article-list']);
      this.snackBar.open('ARTICLE WAS DELETED');
    });
  }
}
