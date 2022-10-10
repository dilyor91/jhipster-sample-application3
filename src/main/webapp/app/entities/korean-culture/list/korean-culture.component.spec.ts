import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { KoreanCultureService } from '../service/korean-culture.service';

import { KoreanCultureComponent } from './korean-culture.component';

describe('KoreanCulture Management Component', () => {
  let comp: KoreanCultureComponent;
  let fixture: ComponentFixture<KoreanCultureComponent>;
  let service: KoreanCultureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'korean-culture', component: KoreanCultureComponent }]), HttpClientTestingModule],
      declarations: [KoreanCultureComponent],
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
      .overrideTemplate(KoreanCultureComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KoreanCultureComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(KoreanCultureService);

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
    expect(comp.koreanCultures?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to koreanCultureService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getKoreanCultureIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getKoreanCultureIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
