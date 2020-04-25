import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TopicModel} from "../models/topic.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ArticleService} from "../services/article.service";
import {ArticleModel} from "../models/article.model";
import {UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  private createArticleForm: FormGroup;
  private articleTopics: TopicModel [];
  private loading = false;
  private isEdit = false;
  private err = false;
  private articleId: string;
  private topicsListIds: number[] = [];
  private btnText: string;
  private headlineText: string;

  constructor(private snackBar: MatSnackBar, public articleService: ArticleService, public articlesService: ArticleService, private httpClient: HttpClient, private formBuilder: FormBuilder, private router: Router, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.btnText = 'Create article';
    this.headlineText = 'Create new article';
    this.isEdit = false;
    this.createArticleForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      articleTopics: ['', Validators.required],
    });
    this.articleService.getTopics()
      .subscribe(
        topics => {
          this.articleTopics = topics;
        },
        err => {
          console.log(err);
        });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('articleId')) {
        this.btnText = 'Edit article';
        this.headlineText = 'Edit article';
        this.topicsListIds = [];
        this.isEdit = true;
        this.articleId = paramMap.get('articleId');
        this.articlesService.getArticleById(+this.articleId).subscribe(res => {
          this.createArticleForm.controls['title'].setValue(res[0].id_title);
          this.createArticleForm.controls['content'].setValue(res[0].contents);
          for (let i in res[0].topics) {
            this.topicsListIds[i] = res[0].topics[i].id;
          }
          this.createArticleForm.controls['articleTopics'].setValue(this.topicsListIds);
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

  onSubmit() {
    this.loading = true;
    let topicListIds: number[] = [];
    for (let i in this.createArticleForm.get('articleTopics').value) {
      topicListIds[i] = this.createArticleForm.get('articleTopics').value[i];
    }
    const article = <ArticleModel>{
      id: this.isEdit ? +this.articleId : null,
      title: this.createArticleForm.get('title').value,
      content: this.createArticleForm.get('content').value,
      topicIds: topicListIds
    };
    this.createArticleForm.controls['title'].disable();
    this.createArticleForm.controls['content'].disable();
    this.createArticleForm.controls['articleTopics'].disable();
    if (!this.isEdit) {
      this.articleService.createArticle(article).subscribe(data => {
        this.router.navigate(['/article-list']);
        console.log('article created');
      }, error => {
        console.warn(error);
        this.loading = false;
        this.createArticleForm.controls['title'].enable();
        this.createArticleForm.controls['content'].enable();
        this.createArticleForm.controls['articleTopics'].enable();
      });
    } else {
      this.articleService.editArticle(article).subscribe(data => {
        this.router.navigate(['/article',this.articleId]);
        console.log('article edited');
      }, error => {
        console.warn(error);
        this.loading = false;
        this.createArticleForm.controls['title'].enable();
        this.createArticleForm.controls['content'].enable();
        this.createArticleForm.controls['articleTopics'].enable();
      });
    }
  }

}
