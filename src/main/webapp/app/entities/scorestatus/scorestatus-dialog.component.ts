import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Scorestatus } from './scorestatus.model';
import { ScorestatusPopupService } from './scorestatus-popup.service';
import { ScorestatusService } from './scorestatus.service';

@Component({
    selector: 'jhi-scorestatus-dialog',
    templateUrl: './scorestatus-dialog.component.html'
})
export class ScorestatusDialogComponent implements OnInit {

    scorestatus: Scorestatus;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private scorestatusService: ScorestatusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scorestatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scorestatusService.update(this.scorestatus));
        } else {
            this.subscribeToSaveResponse(
                this.scorestatusService.create(this.scorestatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<Scorestatus>) {
        result.subscribe((res: Scorestatus) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Scorestatus) {
        this.eventManager.broadcast({ name: 'scorestatusListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-scorestatus-popup',
    template: ''
})
export class ScorestatusPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scorestatusPopupService: ScorestatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.scorestatusPopupService
                    .open(ScorestatusDialogComponent as Component, params['id']);
            } else {
                this.scorestatusPopupService
                    .open(ScorestatusDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
