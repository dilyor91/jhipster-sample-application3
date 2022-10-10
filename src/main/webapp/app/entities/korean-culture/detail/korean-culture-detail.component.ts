import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKoreanCulture } from '../korean-culture.model';

@Component({
  selector: 'jhi-korean-culture-detail',
  templateUrl: './korean-culture-detail.component.html',
})
export class KoreanCultureDetailComponent implements OnInit {
  koreanCulture: IKoreanCulture | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ koreanCulture }) => {
      this.koreanCulture = koreanCulture;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
