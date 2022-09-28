import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MaterialTopicFormService } from './material-topic-form.service';
import { MaterialTopicService } from '../service/material-topic.service';
import { IMaterialTopic } from '../material-topic.model';
import { IMaterialTopicLevel } from 'app/entities/material-topic-level/material-topic-level.model';
import { MaterialTopicLevelService } from 'app/entities/material-topic-level/service/material-topic-level.service';

import { MaterialTopicUpdateComponent } from './material-topic-update.component';

describe('MaterialTopic Management Update Component', () => {
  let comp: MaterialTopicUpdateComponent;
  let fixture: ComponentFixture<MaterialTopicUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let materialTopicFormService: MaterialTopicFormService;
  let materialTopicService: MaterialTopicService;
  let materialTopicLevelService: MaterialTopicLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MaterialTopicUpdateComponent],
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
      .overrideTemplate(MaterialTopicUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MaterialTopicUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    materialTopicFormService = TestBed.inject(MaterialTopicFormService);
    materialTopicService = TestBed.inject(MaterialTopicService);
    materialTopicLevelService = TestBed.inject(MaterialTopicLevelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call MaterialTopicLevel query and add missing value', () => {
      const materialTopic: IMaterialTopic = { id: 456 };
      const materialTopicLevel: IMaterialTopicLevel = { id: 19371 };
      materialTopic.materialTopicLevel = materialTopicLevel;

      const materialTopicLevelCollection: IMaterialTopicLevel[] = [{ id: 21437 }];
      jest.spyOn(materialTopicLevelService, 'query').mockReturnValue(of(new HttpResponse({ body: materialTopicLevelCollection })));
      const additionalMaterialTopicLevels = [materialTopicLevel];
      const expectedCollection: IMaterialTopicLevel[] = [...additionalMaterialTopicLevels, ...materialTopicLevelCollection];
      jest.spyOn(materialTopicLevelService, 'addMaterialTopicLevelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ materialTopic });
      comp.ngOnInit();

      expect(materialTopicLevelService.query).toHaveBeenCalled();
      expect(materialTopicLevelService.addMaterialTopicLevelToCollectionIfMissing).toHaveBeenCalledWith(
        materialTopicLevelCollection,
        ...additionalMaterialTopicLevels.map(expect.objectContaining)
      );
      expect(comp.materialTopicLevelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const materialTopic: IMaterialTopic = { id: 456 };
      const materialTopicLevel: IMaterialTopicLevel = { id: 15519 };
      materialTopic.materialTopicLevel = materialTopicLevel;

      activatedRoute.data = of({ materialTopic });
      comp.ngOnInit();

      expect(comp.materialTopicLevelsSharedCollection).toContain(materialTopicLevel);
      expect(comp.materialTopic).toEqual(materialTopic);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMaterialTopic>>();
      const materialTopic = { id: 123 };
      jest.spyOn(materialTopicFormService, 'getMaterialTopic').mockReturnValue(materialTopic);
      jest.spyOn(materialTopicService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ materialTopic });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: materialTopic }));
      saveSubject.complete();

      // THEN
      expect(materialTopicFormService.getMaterialTopic).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(materialTopicService.update).toHaveBeenCalledWith(expect.objectContaining(materialTopic));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMaterialTopic>>();
      const materialTopic = { id: 123 };
      jest.spyOn(materialTopicFormService, 'getMaterialTopic').mockReturnValue({ id: null });
      jest.spyOn(materialTopicService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ materialTopic: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: materialTopic }));
      saveSubject.complete();

      // THEN
      expect(materialTopicFormService.getMaterialTopic).toHaveBeenCalled();
      expect(materialTopicService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMaterialTopic>>();
      const materialTopic = { id: 123 };
      jest.spyOn(materialTopicService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ materialTopic });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(materialTopicService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareMaterialTopicLevel', () => {
      it('Should forward to materialTopicLevelService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(materialTopicLevelService, 'compareMaterialTopicLevel');
        comp.compareMaterialTopicLevel(entity, entity2);
        expect(materialTopicLevelService.compareMaterialTopicLevel).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
