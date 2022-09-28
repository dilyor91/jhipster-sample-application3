import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GreetingFormService } from './greeting-form.service';
import { GreetingService } from '../service/greeting.service';
import { IGreeting } from '../greeting.model';

import { GreetingUpdateComponent } from './greeting-update.component';

describe('Greeting Management Update Component', () => {
  let comp: GreetingUpdateComponent;
  let fixture: ComponentFixture<GreetingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let greetingFormService: GreetingFormService;
  let greetingService: GreetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GreetingUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(GreetingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GreetingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    greetingFormService = TestBed.inject(GreetingFormService);
    greetingService = TestBed.inject(GreetingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const greeting: IGreeting = { id: 456 };

      activatedRoute.data = of({ greeting });
      comp.ngOnInit();

      expect(comp.greeting).toEqual(greeting);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGreeting>>();
      const greeting = { id: 123 };
      jest.spyOn(greetingFormService, 'getGreeting').mockReturnValue(greeting);
      jest.spyOn(greetingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ greeting });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: greeting }));
      saveSubject.complete();

      // THEN
      expect(greetingFormService.getGreeting).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(greetingService.update).toHaveBeenCalledWith(expect.objectContaining(greeting));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGreeting>>();
      const greeting = { id: 123 };
      jest.spyOn(greetingFormService, 'getGreeting').mockReturnValue({ id: null });
      jest.spyOn(greetingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ greeting: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: greeting }));
      saveSubject.complete();

      // THEN
      expect(greetingFormService.getGreeting).toHaveBeenCalled();
      expect(greetingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGreeting>>();
      const greeting = { id: 123 };
      jest.spyOn(greetingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ greeting });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(greetingService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
