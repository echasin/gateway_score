import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Scoreclass } from './scoreclass.model';
import { ScoreclassPopupService } from './scoreclass-popup.service';
import { ScoreclassService } from './scoreclass.service';

@Component({
    selector: 'jhi-scoreclass-delete-dialog',
    templateUrl: './scoreclass-delete-dialog.component.html'
})
export class ScoreclassDeleteDialogComponent {

    scoreclass: Scoreclass;

    constructor(
        private scoreclassService: ScoreclassService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scoreclassService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scoreclassListModification',
                content: 'Deleted an scoreclass'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-scoreclass-delete-popup',
    template: ''
})
export class ScoreclassDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scoreclassPopupService: ScoreclassPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.scoreclassPopupService
                .open(ScoreclassDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
