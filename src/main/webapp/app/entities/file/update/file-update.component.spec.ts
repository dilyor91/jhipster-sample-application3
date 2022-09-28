import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FileFormService } from './file-form.service';
import { FileService } from '../service/file.service';
import { IFile } from '../file.model';
import { IInstitution } from 'app/entities/institution/institution.model';
import { InstitutionService } from 'app/entities/institution/service/institution.service';
import { IStudyAtKorea } from 'app/entities/study-at-korea/study-at-korea.model';
import { StudyAtKoreaService } from 'app/entities/study-at-korea/service/study-at-korea.service';

import { FileUpdateComponent } from './file-update.component';

describe('File Management Update Component', () => {
  let comp: FileUpdateComponent;
  let fixture: ComponentFixture<FileUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fileFormService: FileFormService;
  let fileService: FileService;
  let institutionService: InstitutionService;
  let studyAtKoreaService: StudyAtKoreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FileUpdateComponent],
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
      .overrideTemplate(FileUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FileUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fileFormService = TestBed.inject(FileFormService);
    fileService = TestBed.inject(FileService);
    institutionService = TestBed.inject(InstitutionService);
    studyAtKoreaService = TestBed.inject(StudyAtKoreaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Institution query and add missing value', () => {
      const file: IFile = { id: 456 };
      const institution: IInstitution = { id: 61350 };
      file.institution = institution;

      const institutionCollection: IInstitution[] = [{ id: 40205 }];
      jest.spyOn(institutionService, 'query').mockReturnValue(of(new HttpResponse({ body: institutionCollection })));
      const additionalInstitutions = [institution];
      const expectedCollection: IInstitution[] = [...additionalInstitutions, ...institutionCollection];
      jest.spyOn(institutionService, 'addInstitutionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ file });
      comp.ngOnInit();

      expect(institutionService.query).toHaveBeenCalled();
      expect(institutionService.addInstitutionToCollectionIfMissing).toHaveBeenCalledWith(
        institutionCollection,
        ...additionalInstitutions.map(expect.objectContaining)
      );
      expect(comp.institutionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StudyAtKorea query and add missing value', () => {
      const file: IFile = { id: 456 };
      const studyAtKorea: IStudyAtKorea = { id: 23955 };
      file.studyAtKorea = studyAtKorea;

      const studyAtKoreaCollection: IStudyAtKorea[] = [{ id: 88332 }];
      jest.spyOn(studyAtKoreaService, 'query').mockReturnValue(of(new HttpResponse({ body: studyAtKoreaCollection })));
      const additionalStudyAtKoreas = [studyAtKorea];
      const expectedCollection: IStudyAtKorea[] = [...additionalStudyAtKoreas, ...studyAtKoreaCollection];
      jest.spyOn(studyAtKoreaService, 'addStudyAtKoreaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ file });
      comp.ngOnInit();

      expect(studyAtKoreaService.query).toHaveBeenCalled();
      expect(studyAtKoreaService.addStudyAtKoreaToCollectionIfMissing).toHaveBeenCalledWith(
        studyAtKoreaCollection,
        ...additionalStudyAtKoreas.map(expect.objectContaining)
      );
      expect(comp.studyAtKoreasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const file: IFile = { id: 456 };
      const institution: IInstitution = { id: 96978 };
      file.institution = institution;
      const studyAtKorea: IStudyAtKorea = { id: 60193 };
      file.studyAtKorea = studyAtKorea;

      activatedRoute.data = of({ file });
      comp.ngOnInit();

      expect(comp.institutionsSharedCollection).toContain(institution);
      expect(comp.studyAtKoreasSharedCollection).toContain(studyAtKorea);
      expect(comp.file).toEqual(file);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFile>>();
      const file = { id: 123 };
      jest.spyOn(fileFormService, 'getFile').mockReturnValue(file);
      jest.spyOn(fileService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ file });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: file }));
      saveSubject.complete();

      // THEN
      expect(fileFormService.getFile).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fileService.update).toHaveBeenCalledWith(expect.objectContaining(file));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFile>>();
      const file = { id: 123 };
      jest.spyOn(fileFormService, 'getFile').mockReturnValue({ id: null });
      jest.spyOn(fileService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ file: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: file }));
      saveSubject.complete();

      // THEN
      expect(fileFormService.getFile).toHaveBeenCalled();
      expect(fileService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFile>>();
      const file = { id: 123 };
      jest.spyOn(fileService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ file });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fileService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareInstitution', () => {
      it('Should forward to institutionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(institutionService, 'compareInstitution');
        comp.compareInstitution(entity, entity2);
        expect(institutionService.compareInstitution).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareStudyAtKorea', () => {
      it('Should forward to studyAtKoreaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(studyAtKoreaService, 'compareStudyAtKorea');
        comp.compareStudyAtKorea(entity, entity2);
        expect(studyAtKoreaService.compareStudyAtKorea).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
