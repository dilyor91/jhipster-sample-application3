import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { BannerFormService, BannerFormGroup } from './banner-form.service';
import { IBanner } from '../banner.model';
import { BannerService } from '../service/banner.service';

@Component({
  selector: 'jhi-banner-update',
  templateUrl: './banner-update.component.html',
})
export class BannerUpdateComponent implements OnInit {
  isSaving = false;
  banner: IBanner | null = null;

  editForm: BannerFormGroup = this.bannerFormService.createBannerFormGroup();

  constructor(
    protected bannerService: BannerService,
    protected bannerFormService: BannerFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ banner }) => {
      this.banner = banner;
      if (banner) {
        this.updateForm(banner);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const banner = this.bannerFormService.getBanner(this.editForm);
    if (banner.id !== null) {
      this.subscribeToSaveResponse(this.bannerService.update(banner));
    } else {
      this.subscribeToSaveResponse(this.bannerService.create(banner));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBanner>>): void {
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

  protected updateForm(banner: IBanner): void {
    this.banner = banner;
    this.bannerFormService.resetForm(this.editForm, banner);
  }
}
