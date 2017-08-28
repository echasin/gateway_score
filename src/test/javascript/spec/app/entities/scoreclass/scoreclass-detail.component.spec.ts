/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayScoreTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ScoreclassDetailComponent } from '../../../../../../main/webapp/app/entities/scoreclass/scoreclass-detail.component';
import { ScoreclassService } from '../../../../../../main/webapp/app/entities/scoreclass/scoreclass.service';
import { Scoreclass } from '../../../../../../main/webapp/app/entities/scoreclass/scoreclass.model';

describe('Component Tests', () => {

    describe('Scoreclass Management Detail Component', () => {
        let comp: ScoreclassDetailComponent;
        let fixture: ComponentFixture<ScoreclassDetailComponent>;
        let service: ScoreclassService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayScoreTestModule],
                declarations: [ScoreclassDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ScoreclassService,
                    JhiEventManager
                ]
            }).overrideTemplate(ScoreclassDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScoreclassDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScoreclassService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Scoreclass(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.scoreclass).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
