import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Sidebar} from "../models/sidebar";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private admin = false;
  private teacher = false;
  private student = false;
  private href: string = "";
  private SIDEBAR_DATA: Sidebar[] = [];
  private notificationCount = 0;
  private isLoading = false;
  private roles: string[];

  constructor(private httpClient: HttpClient, private  router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.roles=[];
    this.isLoading = true;
    this.userService.getUserRole().subscribe(res => {
      this.isLoading = false;
      for (let i in res) {
        this.roles[i] = res[i].name;
      }
      if (this.roles.includes("TEACHER")) {
        this.teacher = true;
      } else if (this.roles.includes("ADMIN")) {
        this.admin = true;
      } else {
        this.student = true;
      }
      this.SIDEBAR_DATA = [
        {
          activeSRC: '../../assets/img/admTableActive.svg',
          noActiveSRC: '../../assets/img/admTableNoActive.svg',
          routerLink: '/admin-table',
          alt: 'table-users',
          role: this.admin,
          active: false
        },
        {
          activeSRC: '../../assets/img/dictionariesActive.svg',
          noActiveSRC: '../../assets/img/dictionariesNoActive.svg',
          routerLink: '/dictionaries',
          alt: 'dictionaries',
          role: this.admin,
          active: false
        },
        {
          activeSRC: '../../assets/img/createArticleActive.svg',
          noActiveSRC: '../../assets/img/createArticleNoActive.svg',
          routerLink: '/admin-badges',
          alt: 'admin-badges',
          role: this.admin,
          active: false
        },
        {
          activeSRC: '../../assets/img/myProfileActive.svg',
          noActiveSRC: '../../assets/img/myProfileNoActive.svg',
          routerLink: '/teacher-profile',
          alt: 'teacher-profile',
          role: this.teacher,
          active: false
        },
        {
          activeSRC: '../../assets/img/myProfileActive.svg',
          noActiveSRC: '../../assets/img/myProfileNoActive.svg',
          routerLink: '/student-profile',
          alt: 'student-profile',
          role: this.student,
          active: false
        },
        {
          activeSRC: '../../assets/img/subscriptionsActive.svg',
          noActiveSRC: '../../assets/img/subscriptionsNoActive.svg',
          routerLink: '/subscriptions',
          alt: 'subscriptions',
          role: this.teacher,
          active: false
        },
        {
          activeSRC: '../../assets/img/subscriptionsActive.svg',
          noActiveSRC: '../../assets/img/subscriptionsNoActive.svg',
          routerLink: '/subscriptions',
          alt: 'subscriptions',
          role: this.student,
          active: false
        },
        {
          activeSRC: '../../assets/img/notificationActive.svg',
          noActiveSRC: '../../assets/img/notificationNoActive.svg',
          routerLink: '/notifications',
          alt: 'notifications',
          role: this.teacher,
          active: false
        },
        {
          activeSRC: '../../assets/img/createArticleActive.svg',
          noActiveSRC: '../../assets/img/createArticleNoActive.svg',
          routerLink: '/create-article',
          alt: 'create-article',
          role: this.teacher,
          active: false
        },
        {
          activeSRC: '../../assets/img/meetupCreateActive.svg',
          noActiveSRC: '../../assets/img/meetupCreateNoActive.svg',
          routerLink: '/meetup-create',
          alt: 'meetup-create',
          role: this.teacher,
          active: false
        },
        {
          activeSRC: '../../assets/img/meetupListActive.svg',
          noActiveSRC: '../../assets/img/meetupListNoActive.svg',
          routerLink: '/meetup-list',
          alt: 'meetup-list',
          role: this.teacher,
          active: false
        },
        {
          activeSRC: '../../assets/img/meetupListActive.svg',
          noActiveSRC: '../../assets/img/meetupListNoActive.svg',
          routerLink: '/meetup-list',
          alt: 'meetup-list',
          role: this.student,
          active: false
        },

        {
          activeSRC: '../../assets/img/notificationActive.svg',
          noActiveSRC: '../../assets/img/notificationNoActive.svg',
          routerLink: '/notifications',
          alt: 'notifications',
          role: this.student,
          active: false
        },
        {
          activeSRC: '../../assets/img/articleActive.svg',
          noActiveSRC: '../../assets/img/articleNoActive.svg',
          routerLink: '/article-list',
          alt: 'article-list',
          role: true,
          active: false
        },
        {
          activeSRC: '../../assets/img/settingsActive.svg',
          noActiveSRC: '../../assets/img/settingsNoActive.svg',
          routerLink: '/change-password',
          alt: 'change-password',
          role: this.teacher,
          active: false
        },
        {
          activeSRC: '../../assets/img/settingsActive.svg',
          noActiveSRC: '../../assets/img/settingsNoActive.svg',
          routerLink: '/change-password',
          alt: 'change-password',
          role: this.student,
          active: false
        }
      ];
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (!(paramMap.has('speakerId') || paramMap.has('listenerId'))) {
          this.href = this.router.url;
          for (let bar in this.SIDEBAR_DATA) {
            if (this.href.includes(this.SIDEBAR_DATA[bar].routerLink)) {
              this.SIDEBAR_DATA[bar].active = true;
            }
          }
        }
      });
    });
  }

  hamburger() {
    const hamburger = document.querySelector(".hamburger");
    const bar = document.querySelector(".sidebar");
    bar.classList.toggle("active");
    hamburger.classList.toggle("is-active");
  }
}
