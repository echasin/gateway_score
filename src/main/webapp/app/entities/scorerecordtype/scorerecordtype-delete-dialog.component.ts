import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Scorerecordtype } from './scorerecordtype.model';
import { ScorerecordtypePopupService } from './scorerecordtype-popup.service';
import { ScorerecordtypeService } from './scorerecordtype.service';

@Component({
    selector: 'jhi-scorerecordtype-delete-dialog',
    templateUrl: './scorerecordtype-delete-dialog.component.html'
})
export class ScorerecordtypeDeleteDialogComponent {

    scorerecordtype: Scorerecordtype;

    constructor(
        private scorerecordtypeService: ScorerecordtypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scorerecordtypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scorerecordtypeListModification',
                content: 'Deleted an scorerecordtype'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-scorerecordtype-delete-popup',
    template: ''
})
export class ScorerecordtypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scorerecordtypePopupService: ScorerecordtypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.scorerecordtypePopupService
                .open(ScorerecordtypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
