import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Scoretype } from './scoretype.model';
import { ScoretypePopupService } from './scoretype-popup.service';
import { ScoretypeService } from './scoretype.service';

@Component({
    selector: 'jhi-scoretype-delete-dialog',
    templateUrl: './scoretype-delete-dialog.component.html'
})
export class ScoretypeDeleteDialogComponent {

    scoretype: Scoretype;

    constructor(
        private scoretypeService: ScoretypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scoretypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scoretypeListModification',
                content: 'Deleted an scoretype'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-scoretype-delete-popup',
    template: ''
})
export class ScoretypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scoretypePopupService: ScoretypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.scoretypePopupService
                .open(ScoretypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
