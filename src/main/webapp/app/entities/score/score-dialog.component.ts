import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Score } from './score.model';
import { ScorePopupService } from './score-popup.service';
import { ScoreService } from './score.service';
import { Scorestatus, ScorestatusService } from '../scorestatus';
import { Scorerecordtype, ScorerecordtypeService } from '../scorerecordtype';
import { Scoreclass, ScoreclassService } from '../scoreclass';
import { Scorecategory, ScorecategoryService } from '../scorecategory';
import { Scoretype, ScoretypeService } from '../scoretype';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-score-dialog',
    templateUrl: './score-dialog.component.html'
})
export class ScoreDialogComponent implements OnInit {

    score: Score;
    isSaving: boolean;

    scorestatuses: Scorestatus[];

    scorerecordtypes: Scorerecordtype[];

    scoreclasses: Scoreclass[];

    scorecategories: Scorecategory[];

    scoretypes: Scoretype[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private scoreService: ScoreService,
        private scorestatusService: ScorestatusService,
        private scorerecordtypeService: ScorerecordtypeService,
        private scoreclassService: ScoreclassService,
        private scorecategoryService: ScorecategoryService,
        private scoretypeService: ScoretypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.scorestatusService.query()
            .subscribe((res: ResponseWrapper) => { this.scorestatuses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.scorerecordtypeService.query()
            .subscribe((res: ResponseWrapper) => { this.scorerecordtypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.scoreclassService.query()
            .subscribe((res: ResponseWrapper) => { this.scoreclasses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.scorecategoryService.query()
            .subscribe((res: ResponseWrapper) => { this.scorecategories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.scoretypeService.query()
            .subscribe((res: ResponseWrapper) => { this.scoretypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.score.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scoreService.update(this.score));
        } else {
            this.subscribeToSaveResponse(
                this.scoreService.create(this.score));
        }
    }

    private subscribeToSaveResponse(result: Observable<Score>) {
        result.subscribe((res: Score) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Score) {
        this.eventManager.broadcast({ name: 'scoreListModification', content: 'OK'});
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

    trackScoreclassById(index: number, item: Scoreclass) {
        return item.id;
    }

    trackScorecategoryById(index: number, item: Scorecategory) {
        return item.id;
    }

    trackScoretypeById(index: number, item: Scoretype) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-score-popup',
    template: ''
})
export class ScorePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scorePopupService: ScorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.scorePopupService
                    .open(ScoreDialogComponent as Component, params['id']);
            } else {
                this.scorePopupService
                    .open(ScoreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
