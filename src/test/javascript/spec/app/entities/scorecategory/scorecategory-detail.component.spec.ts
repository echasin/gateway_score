/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayScoreTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ScorecategoryDetailComponent } from '../../../../../../main/webapp/app/entities/scorecategory/scorecategory-detail.component';
import { ScorecategoryService } from '../../../../../../main/webapp/app/entities/scorecategory/scorecategory.service';
import { Scorecategory } from '../../../../../../main/webapp/app/entities/scorecategory/scorecategory.model';

describe('Component Tests', () => {

    describe('Scorecategory Management Detail Component', () => {
        let comp: ScorecategoryDetailComponent;
        let fixture: ComponentFixture<ScorecategoryDetailComponent>;
        let service: ScorecategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayScoreTestModule],
                declarations: [ScorecategoryDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ScorecategoryService,
                    JhiEventManager
                ]
            }).overrideTemplate(ScorecategoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScorecategoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScorecategoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Scorecategory(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.scorecategory).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
