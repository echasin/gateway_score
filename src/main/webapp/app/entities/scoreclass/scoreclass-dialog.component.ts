import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Scoreclass } from './scoreclass.model';
import { ScoreclassPopupService } from './scoreclass-popup.service';
import { ScoreclassService } from './scoreclass.service';
import { Scorestatus, ScorestatusService } from '../scorestatus';
import { Scorerecordtype, ScorerecordtypeService } from '../scorerecordtype';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-scoreclass-dialog',
    templateUrl: './scoreclass-dialog.component.html'
})
export class ScoreclassDialogComponent implements OnInit {

    scoreclass: Scoreclass;
    isSaving: boolean;

    scorestatuses: Scorestatus[];

    scorerecordtypes: Scorerecordtype[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private scoreclassService: ScoreclassService,
        private scorestatusService: ScorestatusService,
        private scorerecordtypeService: ScorerecordtypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.scorestatusService.query()
            .subscribe((res: ResponseWrapper) => { this.scorestatuses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.scorerecordtypeService.query()
            .subscribe((res: ResponseWrapper) => { this.scorerecordtypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scoreclass.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scoreclassService.update(this.scoreclass));
        } else {
            this.subscribeToSaveResponse(
                this.scoreclassService.create(this.scoreclass));
        }
    }

    private subscribeToSaveResponse(result: Observable<Scoreclass>) {
        result.subscribe((res: Scoreclass) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Scoreclass) {
        this.eventManager.broadcast({ name: 'scoreclassListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackScorestatusById(index: number, item: Scorestatus) {
        return item.id;
    }

    trackScorerecordtypeById(index: number, item: Scorerecordtype) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-scoreclass-popup',
    template: ''
})
export class ScoreclassPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scoreclassPopupService: ScoreclassPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.scoreclassPopupService
                    .open(ScoreclassDialogComponent as Component, params['id']);
            } else {
                this.scoreclassPopupService
                    .open(ScoreclassDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
