import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Scoretype } from './scoretype.model';
import { ScoretypePopupService } from './scoretype-popup.service';
import { ScoretypeService } from './scoretype.service';
import { Scorecategory, ScorecategoryService } from '../scorecategory';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-scoretype-dialog',
    templateUrl: './scoretype-dialog.component.html'
})
export class ScoretypeDialogComponent implements OnInit {

    scoretype: Scoretype;
    isSaving: boolean;

    scorecategories: Scorecategory[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private scoretypeService: ScoretypeService,
        private scorecategoryService: ScorecategoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.scorecategoryService.query()
            .subscribe((res: ResponseWrapper) => { this.scorecategories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scoretype.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scoretypeService.update(this.scoretype));
        } else {
            this.subscribeToSaveResponse(
                this.scoretypeService.create(this.scoretype));
        }
    }

    private subscribeToSaveResponse(result: Observable<Scoretype>) {
        result.subscribe((res: Scoretype) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Scoretype) {
        this.eventManager.broadcast({ name: 'scoretypeListModification', content: 'OK'});
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

    trackScorecategoryById(index: number, item: Scorecategory) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-scoretype-popup',
    template: ''
})
export class ScoretypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scoretypePopupService: ScoretypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.scoretypePopupService
                    .open(ScoretypeDialogComponent as Component, params['id']);
            } else {
                this.scoretypePopupService
                    .open(ScoretypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
