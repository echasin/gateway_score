import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Scorecategory } from './scorecategory.model';
import { ScorecategoryService } from './scorecategory.service';

@Injectable()
export class ScorecategoryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scorecategoryService: ScorecategoryService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.scorecategoryService.find(id).subscribe((scorecategory) => {
                    scorecategory.lastmodifieddatetime = this.datePipe
                        .transform(scorecategory.lastmodifieddatetime, 'yyyy-MM-ddThh:mm');
                    this.ngbModalRef = this.scorecategoryModalRef(component, scorecategory);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.scorecategoryModalRef(component, new Scorecategory());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    scorecategoryModalRef(component: Component, scorecategory: Scorecategory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scorecategory = scorecategory;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
