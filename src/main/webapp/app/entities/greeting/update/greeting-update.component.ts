import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { GreetingFormService, GreetingFormGroup } from './greeting-form.service';
import { IGreeting } from '../greeting.model';
import { GreetingService } from '../service/greeting.service';

@Component({
  selector: 'jhi-greeting-update',
  templateUrl: './greeting-update.component.html',
})
export class GreetingUpdateComponent implements OnInit {
  isSaving = false;
  greeting: IGreeting | null = null;

  editForm: GreetingFormGroup = this.greetingFormService.createGreetingFormGroup();

  constructor(
    protected greetingService: GreetingService,
    protected greetingFormService: GreetingFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ greeting }) => {
      this.greeting = greeting;
      if (greeting) {
        this.updateForm(greeting);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const greeting = this.greetingFormService.getGreeting(this.editForm);
    if (greeting.id !== null) {
      this.subscribeToSaveResponse(this.greetingService.update(greeting));
    } else {
      this.subscribeToSaveResponse(this.greetingService.create(greeting));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGreeting>>): void {
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

  protected updateForm(greeting: IGreeting): void {
    this.greeting = greeting;
    this.greetingFormService.resetForm(this.editForm, greeting);
  }
}
