import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FileTopicFormService } from './file-topic-form.service';
import { FileTopicService } from '../service/file-topic.service';
import { IFileTopic } from '../file-topic.model';
import { IMaterialTopicLevel } from 'app/entities/material-topic-level/material-topic-level.model';
import { MaterialTopicLevelService } from 'app/entities/material-topic-level/service/material-topic-level.service';

import { FileTopicUpdateComponent } from './file-topic-update.component';

describe('FileTopic Management Update Component', () => {
  let comp: FileTopicUpdateComponent;
  let fixture: ComponentFixture<FileTopicUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fileTopicFormService: FileTopicFormService;
  let fileTopicService: FileTopicService;
  let materialTopicLevelService: MaterialTopicLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FileTopicUpdateComponent],
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
      .overrideTemplate(FileTopicUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FileTopicUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fileTopicFormService = TestBed.inject(FileTopicFormService);
    fileTopicService = TestBed.inject(FileTopicService);
    materialTopicLevelService = TestBed.inject(MaterialTopicLevelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call MaterialTopicLevel query and add missing value', () => {
      const fileTopic: IFileTopic = { id: 456 };
      const materialTopicLevel: IMaterialTopicLevel = { id: 29864 };
      fileTopic.materialTopicLevel = materialTopicLevel;

      const materialTopicLevelCollection: IMaterialTopicLevel[] = [{ id: 2552 }];
      jest.spyOn(materialTopicLevelService, 'query').mockReturnValue(of(new HttpResponse({ body: materialTopicLevelCollection })));
      const additionalMaterialTopicLevels = [materialTopicLevel];
      const expectedCollection: IMaterialTopicLevel[] = [...additionalMaterialTopicLevels, ...materialTopicLevelCollection];
      jest.spyOn(materialTopicLevelService, 'addMaterialTopicLevelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fileTopic });
      comp.ngOnInit();

      expect(materialTopicLevelService.query).toHaveBeenCalled();
      expect(materialTopicLevelService.addMaterialTopicLevelToCollectionIfMissing).toHaveBeenCalledWith(
        materialTopicLevelCollection,
        ...additionalMaterialTopicLevels.map(expect.objectContaining)
      );
      expect(comp.materialTopicLevelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const fileTopic: IFileTopic = { id: 456 };
      const materialTopicLevel: IMaterialTopicLevel = { id: 56937 };
      fileTopic.materialTopicLevel = materialTopicLevel;

      activatedRoute.data = of({ fileTopic });
      comp.ngOnInit();

      expect(comp.materialTopicLevelsSharedCollection).toContain(materialTopicLevel);
      expect(comp.fileTopic).toEqual(fileTopic);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFileTopic>>();
      const fileTopic = { id: 123 };
      jest.spyOn(fileTopicFormService, 'getFileTopic').mockReturnValue(fileTopic);
      jest.spyOn(fileTopicService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fileTopic });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fileTopic }));
      saveSubject.complete();

      // THEN
      expect(fileTopicFormService.getFileTopic).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fileTopicService.update).toHaveBeenCalledWith(expect.objectContaining(fileTopic));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFileTopic>>();
      const fileTopic = { id: 123 };
      jest.spyOn(fileTopicFormService, 'getFileTopic').mockReturnValue({ id: null });
      jest.spyOn(fileTopicService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fileTopic: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fileTopic }));
      saveSubject.complete();

      // THEN
      expect(fileTopicFormService.getFileTopic).toHaveBeenCalled();
      expect(fileTopicService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFileTopic>>();
      const fileTopic = { id: 123 };
      jest.spyOn(fileTopicService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fileTopic });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fileTopicService.update).toHaveBeenCalled();
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
