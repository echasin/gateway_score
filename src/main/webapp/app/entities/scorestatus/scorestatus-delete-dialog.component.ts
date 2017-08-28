import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Scorestatus } from './scorestatus.model';
import { ScorestatusPopupService } from './scorestatus-popup.service';
import { ScorestatusService } from './scorestatus.service';

@Component({
    selector: 'jhi-scorestatus-delete-dialog',
    templateUrl: './scorestatus-delete-dialog.component.html'
})
export class ScorestatusDeleteDialogComponent {

    scorestatus: Scorestatus;

    constructor(
        private scorestatusService: ScorestatusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scorestatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scorestatusListModification',
                content: 'Deleted an scorestatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-scorestatus-delete-popup',
    template: ''
})
export class ScorestatusDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scorestatusPopupService: ScorestatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.scorestatusPopupService
                .open(ScorestatusDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
