import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Scorestatus } from './scorestatus.model';
import { ScorestatusService } from './scorestatus.service';

@Injectable()
export class ScorestatusPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scorestatusService: ScorestatusService

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
                this.scorestatusService.find(id).subscribe((scorestatus) => {
                    scorestatus.lastmodifieddatetime = this.datePipe
                        .transform(scorestatus.lastmodifieddatetime, 'yyyy-MM-ddThh:mm');
                    this.ngbModalRef = this.scorestatusModalRef(component, scorestatus);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.scorestatusModalRef(component, new Scorestatus());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    scorestatusModalRef(component: Component, scorestatus: Scorestatus): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scorestatus = scorestatus;
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
