import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Scorecategory } from './scorecategory.model';
import { ScorecategoryPopupService } from './scorecategory-popup.service';
import { ScorecategoryService } from './scorecategory.service';

@Component({
    selector: 'jhi-scorecategory-delete-dialog',
    templateUrl: './scorecategory-delete-dialog.component.html'
})
export class ScorecategoryDeleteDialogComponent {

    scorecategory: Scorecategory;

    constructor(
        private scorecategoryService: ScorecategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scorecategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scorecategoryListModification',
                content: 'Deleted an scorecategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-scorecategory-delete-popup',
    template: ''
})
export class ScorecategoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scorecategoryPopupService: ScorecategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.scorecategoryPopupService
                .open(ScorecategoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
