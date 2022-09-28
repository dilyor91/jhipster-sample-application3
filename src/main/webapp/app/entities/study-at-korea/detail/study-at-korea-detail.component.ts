import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudyAtKorea } from '../study-at-korea.model';

@Component({
  selector: 'jhi-study-at-korea-detail',
  templateUrl: './study-at-korea-detail.component.html',
})
export class StudyAtKoreaDetailComponent implements OnInit {
  studyAtKorea: IStudyAtKorea | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ studyAtKorea }) => {
      this.studyAtKorea = studyAtKorea;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
