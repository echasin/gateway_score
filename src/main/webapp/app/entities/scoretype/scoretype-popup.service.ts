import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Scoretype } from './scoretype.model';
import { ScoretypeService } from './scoretype.service';

@Injectable()
export class ScoretypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private scoretypeService: ScoretypeService

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
                this.scoretypeService.find(id).subscribe((scoretype) => {
                    scoretype.lastmodifieddatetime = this.datePipe
                        .transform(scoretype.lastmodifieddatetime, 'yyyy-MM-ddThh:mm');
                    this.ngbModalRef = this.scoretypeModalRef(component, scoretype);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.scoretypeModalRef(component, new Scoretype());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    scoretypeModalRef(component: Component, scoretype: Scoretype): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scoretype = scoretype;
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
