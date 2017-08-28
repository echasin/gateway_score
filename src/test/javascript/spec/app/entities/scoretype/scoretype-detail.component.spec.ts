/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayScoreTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ScoretypeDetailComponent } from '../../../../../../main/webapp/app/entities/scoretype/scoretype-detail.component';
import { ScoretypeService } from '../../../../../../main/webapp/app/entities/scoretype/scoretype.service';
import { Scoretype } from '../../../../../../main/webapp/app/entities/scoretype/scoretype.model';

describe('Component Tests', () => {

    describe('Scoretype Management Detail Component', () => {
        let comp: ScoretypeDetailComponent;
        let fixture: ComponentFixture<ScoretypeDetailComponent>;
        let service: ScoretypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayScoreTestModule],
                declarations: [ScoretypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ScoretypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(ScoretypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScoretypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScoretypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Scoretype(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.scoretype).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
