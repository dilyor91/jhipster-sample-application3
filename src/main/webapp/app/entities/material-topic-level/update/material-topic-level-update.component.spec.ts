import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MaterialTopicLevelFormService } from './material-topic-level-form.service';
import { MaterialTopicLevelService } from '../service/material-topic-level.service';
import { IMaterialTopicLevel } from '../material-topic-level.model';

import { MaterialTopicLevelUpdateComponent } from './material-topic-level-update.component';

describe('MaterialTopicLevel Management Update Component', () => {
  let comp: MaterialTopicLevelUpdateComponent;
  let fixture: ComponentFixture<MaterialTopicLevelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let materialTopicLevelFormService: MaterialTopicLevelFormService;
  let materialTopicLevelService: MaterialTopicLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MaterialTopicLevelUpdateComponent],
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
      .overrideTemplate(MaterialTopicLevelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MaterialTopicLevelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    materialTopicLevelFormService = TestBed.inject(MaterialTopicLevelFormService);
    materialTopicLevelService = TestBed.inject(MaterialTopicLevelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const materialTopicLevel: IMaterialTopicLevel = { id: 456 };

      activatedRoute.data = of({ materialTopicLevel });
      comp.ngOnInit();

      expect(comp.materialTopicLevel).toEqual(materialTopicLevel);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMaterialTopicLevel>>();
      const materialTopicLevel = { id: 123 };
      jest.spyOn(materialTopicLevelFormService, 'getMaterialTopicLevel').mockReturnValue(materialTopicLevel);
      jest.spyOn(materialTopicLevelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ materialTopicLevel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: materialTopicLevel }));
      saveSubject.complete();

      // THEN
      expect(materialTopicLevelFormService.getMaterialTopicLevel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(materialTopicLevelService.update).toHaveBeenCalledWith(expect.objectContaining(materialTopicLevel));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMaterialTopicLevel>>();
      const materialTopicLevel = { id: 123 };
      jest.spyOn(materialTopicLevelFormService, 'getMaterialTopicLevel').mockReturnValue({ id: null });
      jest.spyOn(materialTopicLevelService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ materialTopicLevel: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: materialTopicLevel }));
      saveSubject.complete();

      // THEN
      expect(materialTopicLevelFormService.getMaterialTopicLevel).toHaveBeenCalled();
      expect(materialTopicLevelService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMaterialTopicLevel>>();
      const materialTopicLevel = { id: 123 };
      jest.spyOn(materialTopicLevelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ materialTopicLevel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(materialTopicLevelService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
