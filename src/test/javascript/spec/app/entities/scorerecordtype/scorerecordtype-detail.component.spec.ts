/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayScoreTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ScorerecordtypeDetailComponent } from '../../../../../../main/webapp/app/entities/scorerecordtype/scorerecordtype-detail.component';
import { ScorerecordtypeService } from '../../../../../../main/webapp/app/entities/scorerecordtype/scorerecordtype.service';
import { Scorerecordtype } from '../../../../../../main/webapp/app/entities/scorerecordtype/scorerecordtype.model';

describe('Component Tests', () => {

    describe('Scorerecordtype Management Detail Component', () => {
        let comp: ScorerecordtypeDetailComponent;
        let fixture: ComponentFixture<ScorerecordtypeDetailComponent>;
        let service: ScorerecordtypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayScoreTestModule],
                declarations: [ScorerecordtypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ScorerecordtypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(ScorerecordtypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScorerecordtypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScorerecordtypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Scorerecordtype(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.scorerecordtype).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
