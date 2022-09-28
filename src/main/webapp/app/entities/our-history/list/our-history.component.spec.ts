import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OurHistoryService } from '../service/our-history.service';

import { OurHistoryComponent } from './our-history.component';

describe('OurHistory Management Component', () => {
  let comp: OurHistoryComponent;
  let fixture: ComponentFixture<OurHistoryComponent>;
  let service: OurHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'our-history', component: OurHistoryComponent }]), HttpClientTestingModule],
      declarations: [OurHistoryComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(OurHistoryComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OurHistoryComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OurHistoryService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.ourHistories?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to ourHistoryService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOurHistoryIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOurHistoryIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
