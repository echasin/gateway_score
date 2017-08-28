/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayScoreTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ScorestatusDetailComponent } from '../../../../../../main/webapp/app/entities/scorestatus/scorestatus-detail.component';
import { ScorestatusService } from '../../../../../../main/webapp/app/entities/scorestatus/scorestatus.service';
import { Scorestatus } from '../../../../../../main/webapp/app/entities/scorestatus/scorestatus.model';

describe('Component Tests', () => {

    describe('Scorestatus Management Detail Component', () => {
        let comp: ScorestatusDetailComponent;
        let fixture: ComponentFixture<ScorestatusDetailComponent>;
        let service: ScorestatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayScoreTestModule],
                declarations: [ScorestatusDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ScorestatusService,
                    JhiEventManager
                ]
            }).overrideTemplate(ScorestatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScorestatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScorestatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Scorestatus(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.scorestatus).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
