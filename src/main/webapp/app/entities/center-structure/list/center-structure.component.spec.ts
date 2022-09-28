import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CenterStructureService } from '../service/center-structure.service';

import { CenterStructureComponent } from './center-structure.component';

describe('CenterStructure Management Component', () => {
  let comp: CenterStructureComponent;
  let fixture: ComponentFixture<CenterStructureComponent>;
  let service: CenterStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'center-structure', component: CenterStructureComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [CenterStructureComponent],
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
      .overrideTemplate(CenterStructureComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CenterStructureComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CenterStructureService);

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
    expect(comp.centerStructures?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to centerStructureService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getCenterStructureIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getCenterStructureIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
