import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { OurHistoryFormService, OurHistoryFormGroup } from './our-history-form.service';
import { IOurHistory } from '../our-history.model';
import { OurHistoryService } from '../service/our-history.service';

@Component({
  selector: 'jhi-our-history-update',
  templateUrl: './our-history-update.component.html',
})
export class OurHistoryUpdateComponent implements OnInit {
  isSaving = false;
  ourHistory: IOurHistory | null = null;

  editForm: OurHistoryFormGroup = this.ourHistoryFormService.createOurHistoryFormGroup();

  constructor(
    protected ourHistoryService: OurHistoryService,
    protected ourHistoryFormService: OurHistoryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ourHistory }) => {
      this.ourHistory = ourHistory;
      if (ourHistory) {
        this.updateForm(ourHistory);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ourHistory = this.ourHistoryFormService.getOurHistory(this.editForm);
    if (ourHistory.id !== null) {
      this.subscribeToSaveResponse(this.ourHistoryService.update(ourHistory));
    } else {
      this.subscribeToSaveResponse(this.ourHistoryService.create(ourHistory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOurHistory>>): void {
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

  protected updateForm(ourHistory: IOurHistory): void {
    this.ourHistory = ourHistory;
    this.ourHistoryFormService.resetForm(this.editForm, ourHistory);
  }
}
