import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOurHistory } from '../our-history.model';

@Component({
  selector: 'jhi-our-history-detail',
  templateUrl: './our-history-detail.component.html',
})
export class OurHistoryDetailComponent implements OnInit {
  ourHistory: IOurHistory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ourHistory }) => {
      this.ourHistory = ourHistory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
