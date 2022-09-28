import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITimeTable } from '../time-table.model';

@Component({
  selector: 'jhi-time-table-detail',
  templateUrl: './time-table-detail.component.html',
})
export class TimeTableDetailComponent implements OnInit {
  timeTable: ITimeTable | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ timeTable }) => {
      this.timeTable = timeTable;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
