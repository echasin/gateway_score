import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Scorerecordtype } from './scorerecordtype.model';
import { ScorerecordtypeService } from './scorerecordtype.service';

@Injectable()
export class ScorerecordtypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scorerecordtypeService: ScorerecordtypeService

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
                this.scorerecordtypeService.find(id).subscribe((scorerecordtype) => {
                    scorerecordtype.lastmodifieddatetime = this.datePipe
                        .transform(scorerecordtype.lastmodifieddatetime, 'yyyy-MM-ddThh:mm');
                    this.ngbModalRef = this.scorerecordtypeModalRef(component, scorerecordtype);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.scorerecordtypeModalRef(component, new Scorerecordtype());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    scorerecordtypeModalRef(component: Component, scorerecordtype: Scorerecordtype): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scorerecordtype = scorerecordtype;
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
