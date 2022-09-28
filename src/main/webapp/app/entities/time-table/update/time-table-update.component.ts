import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TimeTableFormService, TimeTableFormGroup } from './time-table-form.service';
import { ITimeTable } from '../time-table.model';
import { TimeTableService } from '../service/time-table.service';

@Component({
  selector: 'jhi-time-table-update',
  templateUrl: './time-table-update.component.html',
})
export class TimeTableUpdateComponent implements OnInit {
  isSaving = false;
  timeTable: ITimeTable | null = null;

  editForm: TimeTableFormGroup = this.timeTableFormService.createTimeTableFormGroup();

  constructor(
    protected timeTableService: TimeTableService,
    protected timeTableFormService: TimeTableFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ timeTable }) => {
      this.timeTable = timeTable;
      if (timeTable) {
        this.updateForm(timeTable);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const timeTable = this.timeTableFormService.getTimeTable(this.editForm);
    if (timeTable.id !== null) {
      this.subscribeToSaveResponse(this.timeTableService.update(timeTable));
    } else {
      this.subscribeToSaveResponse(this.timeTableService.create(timeTable));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITimeTable>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(timeTable: ITimeTable): void {
    this.timeTable = timeTable;
    this.timeTableFormService.resetForm(this.editForm, timeTable);
  }
}
