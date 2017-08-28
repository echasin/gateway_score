import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Scoreclass } from './scoreclass.model';
import { ScoreclassService } from './scoreclass.service';

@Injectable()
export class ScoreclassPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scoreclassService: ScoreclassService

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
                this.scoreclassService.find(id).subscribe((scoreclass) => {
                    scoreclass.lastmodifieddatetime = this.datePipe
                        .transform(scoreclass.lastmodifieddatetime, 'yyyy-MM-ddThh:mm');
                    this.ngbModalRef = this.scoreclassModalRef(component, scoreclass);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.scoreclassModalRef(component, new Scoreclass());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    scoreclassModalRef(component: Component, scoreclass: Scoreclass): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scoreclass = scoreclass;
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
