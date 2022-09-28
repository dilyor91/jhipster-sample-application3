import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LogoFormService } from './logo-form.service';
import { LogoService } from '../service/logo.service';
import { ILogo } from '../logo.model';

import { LogoUpdateComponent } from './logo-update.component';

describe('Logo Management Update Component', () => {
  let comp: LogoUpdateComponent;
  let fixture: ComponentFixture<LogoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let logoFormService: LogoFormService;
  let logoService: LogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LogoUpdateComponent],
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
      .overrideTemplate(LogoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LogoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    logoFormService = TestBed.inject(LogoFormService);
    logoService = TestBed.inject(LogoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const logo: ILogo = { id: 456 };

      activatedRoute.data = of({ logo });
      comp.ngOnInit();

      expect(comp.logo).toEqual(logo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogo>>();
      const logo = { id: 123 };
      jest.spyOn(logoFormService, 'getLogo').mockReturnValue(logo);
      jest.spyOn(logoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logo }));
      saveSubject.complete();

      // THEN
      expect(logoFormService.getLogo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(logoService.update).toHaveBeenCalledWith(expect.objectContaining(logo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogo>>();
      const logo = { id: 123 };
      jest.spyOn(logoFormService, 'getLogo').mockReturnValue({ id: null });
      jest.spyOn(logoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logo }));
      saveSubject.complete();

      // THEN
      expect(logoFormService.getLogo).toHaveBeenCalled();
      expect(logoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogo>>();
      const logo = { id: 123 };
      jest.spyOn(logoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(logoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
