import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AttachmentFormService } from './attachment-form.service';
import { AttachmentService } from '../service/attachment.service';
import { IAttachment } from '../attachment.model';
import { IKoreanCulture } from 'app/entities/korean-culture/korean-culture.model';
import { KoreanCultureService } from 'app/entities/korean-culture/service/korean-culture.service';

import { AttachmentUpdateComponent } from './attachment-update.component';

describe('Attachment Management Update Component', () => {
  let comp: AttachmentUpdateComponent;
  let fixture: ComponentFixture<AttachmentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let attachmentFormService: AttachmentFormService;
  let attachmentService: AttachmentService;
  let koreanCultureService: KoreanCultureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AttachmentUpdateComponent],
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
      .overrideTemplate(AttachmentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AttachmentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    attachmentFormService = TestBed.inject(AttachmentFormService);
    attachmentService = TestBed.inject(AttachmentService);
    koreanCultureService = TestBed.inject(KoreanCultureService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call KoreanCulture query and add missing value', () => {
      const attachment: IAttachment = { id: 456 };
      const koreanCulture: IKoreanCulture = { id: 1801 };
      attachment.koreanCulture = koreanCulture;

      const koreanCultureCollection: IKoreanCulture[] = [{ id: 269 }];
      jest.spyOn(koreanCultureService, 'query').mockReturnValue(of(new HttpResponse({ body: koreanCultureCollection })));
      const additionalKoreanCultures = [koreanCulture];
      const expectedCollection: IKoreanCulture[] = [...additionalKoreanCultures, ...koreanCultureCollection];
      jest.spyOn(koreanCultureService, 'addKoreanCultureToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ attachment });
      comp.ngOnInit();

      expect(koreanCultureService.query).toHaveBeenCalled();
      expect(koreanCultureService.addKoreanCultureToCollectionIfMissing).toHaveBeenCalledWith(
        koreanCultureCollection,
        ...additionalKoreanCultures.map(expect.objectContaining)
      );
      expect(comp.koreanCulturesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const attachment: IAttachment = { id: 456 };
      const koreanCulture: IKoreanCulture = { id: 81299 };
      attachment.koreanCulture = koreanCulture;

      activatedRoute.data = of({ attachment });
      comp.ngOnInit();

      expect(comp.koreanCulturesSharedCollection).toContain(koreanCulture);
      expect(comp.attachment).toEqual(attachment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAttachment>>();
      const attachment = { id: 123 };
      jest.spyOn(attachmentFormService, 'getAttachment').mockReturnValue(attachment);
      jest.spyOn(attachmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ attachment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: attachment }));
      saveSubject.complete();

      // THEN
      expect(attachmentFormService.getAttachment).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(attachmentService.update).toHaveBeenCalledWith(expect.objectContaining(attachment));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAttachment>>();
      const attachment = { id: 123 };
      jest.spyOn(attachmentFormService, 'getAttachment').mockReturnValue({ id: null });
      jest.spyOn(attachmentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ attachment: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: attachment }));
      saveSubject.complete();

      // THEN
      expect(attachmentFormService.getAttachment).toHaveBeenCalled();
      expect(attachmentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAttachment>>();
      const attachment = { id: 123 };
      jest.spyOn(attachmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ attachment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(attachmentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareKoreanCulture', () => {
      it('Should forward to koreanCultureService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(koreanCultureService, 'compareKoreanCulture');
        comp.compareKoreanCulture(entity, entity2);
        expect(koreanCultureService.compareKoreanCulture).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
