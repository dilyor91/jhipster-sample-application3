import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PopupFormService } from './popup-form.service';
import { PopupService } from '../service/popup.service';
import { IPopup } from '../popup.model';
import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';

import { PopupUpdateComponent } from './popup-update.component';

describe('Popup Management Update Component', () => {
  let comp: PopupUpdateComponent;
  let fixture: ComponentFixture<PopupUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let popupFormService: PopupFormService;
  let popupService: PopupService;
  let attachmentService: AttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PopupUpdateComponent],
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
      .overrideTemplate(PopupUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PopupUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    popupFormService = TestBed.inject(PopupFormService);
    popupService = TestBed.inject(PopupService);
    attachmentService = TestBed.inject(AttachmentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Attachment query and add missing value', () => {
      const popup: IPopup = { id: 456 };
      const attachment: IAttachment = { id: 43499 };
      popup.attachment = attachment;

      const attachmentCollection: IAttachment[] = [{ id: 4493 }];
      jest.spyOn(attachmentService, 'query').mockReturnValue(of(new HttpResponse({ body: attachmentCollection })));
      const additionalAttachments = [attachment];
      const expectedCollection: IAttachment[] = [...additionalAttachments, ...attachmentCollection];
      jest.spyOn(attachmentService, 'addAttachmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ popup });
      comp.ngOnInit();

      expect(attachmentService.query).toHaveBeenCalled();
      expect(attachmentService.addAttachmentToCollectionIfMissing).toHaveBeenCalledWith(
        attachmentCollection,
        ...additionalAttachments.map(expect.objectContaining)
      );
      expect(comp.attachmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const popup: IPopup = { id: 456 };
      const attachment: IAttachment = { id: 16207 };
      popup.attachment = attachment;

      activatedRoute.data = of({ popup });
      comp.ngOnInit();

      expect(comp.attachmentsSharedCollection).toContain(attachment);
      expect(comp.popup).toEqual(popup);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPopup>>();
      const popup = { id: 123 };
      jest.spyOn(popupFormService, 'getPopup').mockReturnValue(popup);
      jest.spyOn(popupService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ popup });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: popup }));
      saveSubject.complete();

      // THEN
      expect(popupFormService.getPopup).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(popupService.update).toHaveBeenCalledWith(expect.objectContaining(popup));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPopup>>();
      const popup = { id: 123 };
      jest.spyOn(popupFormService, 'getPopup').mockReturnValue({ id: null });
      jest.spyOn(popupService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ popup: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: popup }));
      saveSubject.complete();

      // THEN
      expect(popupFormService.getPopup).toHaveBeenCalled();
      expect(popupService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPopup>>();
      const popup = { id: 123 };
      jest.spyOn(popupService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ popup });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(popupService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAttachment', () => {
      it('Should forward to attachmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(attachmentService, 'compareAttachment');
        comp.compareAttachment(entity, entity2);
        expect(attachmentService.compareAttachment).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
