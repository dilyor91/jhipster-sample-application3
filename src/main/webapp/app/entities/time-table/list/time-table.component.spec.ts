import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TimeTableService } from '../service/time-table.service';

import { TimeTableComponent } from './time-table.component';

describe('TimeTable Management Component', () => {
  let comp: TimeTableComponent;
  let fixture: ComponentFixture<TimeTableComponent>;
  let service: TimeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'time-table', component: TimeTableComponent }]), HttpClientTestingModule],
      declarations: [TimeTableComponent],
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
      .overrideTemplate(TimeTableComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TimeTableComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TimeTableService);

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
    expect(comp.timeTables?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to timeTableService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTimeTableIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTimeTableIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
