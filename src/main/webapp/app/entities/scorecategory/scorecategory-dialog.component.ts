import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Scorecategory } from './scorecategory.model';
import { ScorecategoryPopupService } from './scorecategory-popup.service';
import { ScorecategoryService } from './scorecategory.service';
import { Scorestatus, ScorestatusService } from '../scorestatus';
import { Scoreclass, ScoreclassService } from '../scoreclass';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-scorecategory-dialog',
    templateUrl: './scorecategory-dialog.component.html'
})
export class ScorecategoryDialogComponent implements OnInit {

    scorecategory: Scorecategory;
    isSaving: boolean;

    scorestatuses: Scorestatus[];

    scoreclasses: Scoreclass[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private scorecategoryService: ScorecategoryService,
        private scorestatusService: ScorestatusService,
        private scoreclassService: ScoreclassService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.scorestatusService.query()
            .subscribe((res: ResponseWrapper) => { this.scorestatuses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.scoreclassService.query()
            .subscribe((res: ResponseWrapper) => { this.scoreclasses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scorecategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scorecategoryService.update(this.scorecategory));
        } else {
            this.subscribeToSaveResponse(
                this.scorecategoryService.create(this.scorecategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<Scorecategory>) {
        result.subscribe((res: Scorecategory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Scorecategory) {
        this.eventManager.broadcast({ name: 'scorecategoryListModification', content: 'OK'});
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

    trackScoreclassById(index: number, item: Scoreclass) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-scorecategory-popup',
    template: ''
})
export class ScorecategoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scorecategoryPopupService: ScorecategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.scorecategoryPopupService
                    .open(ScorecategoryDialogComponent as Component, params['id']);
            } else {
                this.scorecategoryPopupService
                    .open(ScorecategoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
