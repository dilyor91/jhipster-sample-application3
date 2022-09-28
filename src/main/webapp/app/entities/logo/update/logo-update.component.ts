import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LogoFormService, LogoFormGroup } from './logo-form.service';
import { ILogo } from '../logo.model';
import { LogoService } from '../service/logo.service';

@Component({
  selector: 'jhi-logo-update',
  templateUrl: './logo-update.component.html',
})
export class LogoUpdateComponent implements OnInit {
  isSaving = false;
  logo: ILogo | null = null;

  editForm: LogoFormGroup = this.logoFormService.createLogoFormGroup();

  constructor(protected logoService: LogoService, protected logoFormService: LogoFormService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logo }) => {
      this.logo = logo;
      if (logo) {
        this.updateForm(logo);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const logo = this.logoFormService.getLogo(this.editForm);
    if (logo.id !== null) {
      this.subscribeToSaveResponse(this.logoService.update(logo));
    } else {
      this.subscribeToSaveResponse(this.logoService.create(logo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogo>>): void {
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

  protected updateForm(logo: ILogo): void {
    this.logo = logo;
    this.logoFormService.resetForm(this.editForm, logo);
  }
}
