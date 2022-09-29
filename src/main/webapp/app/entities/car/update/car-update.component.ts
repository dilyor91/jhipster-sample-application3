import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CarFormService, CarFormGroup } from './car-form.service';
import { ICar } from '../car.model';
import { CarService } from '../service/car.service';
import { IOwner } from 'app/entities/owner/owner.model';
import { OwnerService } from 'app/entities/owner/service/owner.service';

@Component({
  selector: 'jhi-car-update',
  templateUrl: './car-update.component.html',
})
export class CarUpdateComponent implements OnInit {
  isSaving = false;
  car: ICar | null = null;

  ownersSharedCollection: IOwner[] = [];

  editForm: CarFormGroup = this.carFormService.createCarFormGroup();

  constructor(
    protected carService: CarService,
    protected carFormService: CarFormService,
    protected ownerService: OwnerService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareOwner = (o1: IOwner | null, o2: IOwner | null): boolean => this.ownerService.compareOwner(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ car }) => {
      this.car = car;
      if (car) {
        this.updateForm(car);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const car = this.carFormService.getCar(this.editForm);
    if (car.id !== null) {
      this.subscribeToSaveResponse(this.carService.update(car));
    } else {
      this.subscribeToSaveResponse(this.carService.create(car));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICar>>): void {
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

  protected updateForm(car: ICar): void {
    this.car = car;
    this.carFormService.resetForm(this.editForm, car);

    this.ownersSharedCollection = this.ownerService.addOwnerToCollectionIfMissing<IOwner>(this.ownersSharedCollection, car.owner);
  }

  protected loadRelationshipsOptions(): void {
    this.ownerService
      .query()
      .pipe(map((res: HttpResponse<IOwner[]>) => res.body ?? []))
      .pipe(map((owners: IOwner[]) => this.ownerService.addOwnerToCollectionIfMissing<IOwner>(owners, this.car?.owner)))
      .subscribe((owners: IOwner[]) => (this.ownersSharedCollection = owners));
  }
}
