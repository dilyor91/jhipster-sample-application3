import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CarFormService } from './car-form.service';
import { CarService } from '../service/car.service';
import { ICar } from '../car.model';
import { IOwner } from 'app/entities/owner/owner.model';
import { OwnerService } from 'app/entities/owner/service/owner.service';

import { CarUpdateComponent } from './car-update.component';

describe('Car Management Update Component', () => {
  let comp: CarUpdateComponent;
  let fixture: ComponentFixture<CarUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let carFormService: CarFormService;
  let carService: CarService;
  let ownerService: OwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CarUpdateComponent],
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
      .overrideTemplate(CarUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CarUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    carFormService = TestBed.inject(CarFormService);
    carService = TestBed.inject(CarService);
    ownerService = TestBed.inject(OwnerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Owner query and add missing value', () => {
      const car: ICar = { id: 456 };
      const owner: IOwner = { id: 67092 };
      car.owner = owner;

      const ownerCollection: IOwner[] = [{ id: 14829 }];
      jest.spyOn(ownerService, 'query').mockReturnValue(of(new HttpResponse({ body: ownerCollection })));
      const additionalOwners = [owner];
      const expectedCollection: IOwner[] = [...additionalOwners, ...ownerCollection];
      jest.spyOn(ownerService, 'addOwnerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ car });
      comp.ngOnInit();

      expect(ownerService.query).toHaveBeenCalled();
      expect(ownerService.addOwnerToCollectionIfMissing).toHaveBeenCalledWith(
        ownerCollection,
        ...additionalOwners.map(expect.objectContaining)
      );
      expect(comp.ownersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const car: ICar = { id: 456 };
      const owner: IOwner = { id: 6011 };
      car.owner = owner;

      activatedRoute.data = of({ car });
      comp.ngOnInit();

      expect(comp.ownersSharedCollection).toContain(owner);
      expect(comp.car).toEqual(car);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICar>>();
      const car = { id: 123 };
      jest.spyOn(carFormService, 'getCar').mockReturnValue(car);
      jest.spyOn(carService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ car });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: car }));
      saveSubject.complete();

      // THEN
      expect(carFormService.getCar).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(carService.update).toHaveBeenCalledWith(expect.objectContaining(car));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICar>>();
      const car = { id: 123 };
      jest.spyOn(carFormService, 'getCar').mockReturnValue({ id: null });
      jest.spyOn(carService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ car: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: car }));
      saveSubject.complete();

      // THEN
      expect(carFormService.getCar).toHaveBeenCalled();
      expect(carService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICar>>();
      const car = { id: 123 };
      jest.spyOn(carService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ car });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(carService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareOwner', () => {
      it('Should forward to ownerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ownerService, 'compareOwner');
        comp.compareOwner(entity, entity2);
        expect(ownerService.compareOwner).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
