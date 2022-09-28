import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IMaterialTopicLevel } from '../material-topic-level.model';
import { MaterialTopicLevelService } from '../service/material-topic-level.service';

import { MaterialTopicLevelRoutingResolveService } from './material-topic-level-routing-resolve.service';

describe('MaterialTopicLevel routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: MaterialTopicLevelRoutingResolveService;
  let service: MaterialTopicLevelService;
  let resultMaterialTopicLevel: IMaterialTopicLevel | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(MaterialTopicLevelRoutingResolveService);
    service = TestBed.inject(MaterialTopicLevelService);
    resultMaterialTopicLevel = undefined;
  });

  describe('resolve', () => {
    it('should return IMaterialTopicLevel returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMaterialTopicLevel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMaterialTopicLevel).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMaterialTopicLevel = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultMaterialTopicLevel).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IMaterialTopicLevel>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMaterialTopicLevel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMaterialTopicLevel).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
