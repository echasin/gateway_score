import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Scorerecordtype } from './scorerecordtype.model';
import { ScorerecordtypePopupService } from './scorerecordtype-popup.service';
import { ScorerecordtypeService } from './scorerecordtype.service';
import { Scorestatus, ScorestatusService } from '../scorestatus';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-scorerecordtype-dialog',
    templateUrl: './scorerecordtype-dialog.component.html'
})
export class ScorerecordtypeDialogComponent implements OnInit {

    scorerecordtype: Scorerecordtype;
    isSaving: boolean;

    scorestatuses: Scorestatus[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private scorerecordtypeService: ScorerecordtypeService,
        private scorestatusService: ScorestatusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.scorestatusService.query()
            .subscribe((res: ResponseWrapper) => { this.scorestatuses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scorerecordtype.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scorerecordtypeService.update(this.scorerecordtype));
        } else {
            this.subscribeToSaveResponse(
                this.scorerecordtypeService.create(this.scorerecordtype));
        }
    }

    private subscribeToSaveResponse(result: Observable<Scorerecordtype>) {
        result.subscribe((res: Scorerecordtype) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Scorerecordtype) {
        this.eventManager.broadcast({ name: 'scorerecordtypeListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-scorerecordtype-popup',
    template: ''
})
export class ScorerecordtypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scorerecordtypePopupService: ScorerecordtypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.scorerecordtypePopupService
                    .open(ScorerecordtypeDialogComponent as Component, params['id']);
            } else {
                this.scorerecordtypePopupService
                    .open(ScorerecordtypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
