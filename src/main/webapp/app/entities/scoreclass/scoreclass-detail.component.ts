import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Scoreclass } from './scoreclass.model';
import { ScoreclassService } from './scoreclass.service';

@Component({
    selector: 'jhi-scoreclass-detail',
    templateUrl: './scoreclass-detail.component.html'
})
export class ScoreclassDetailComponent implements OnInit, OnDestroy {

    scoreclass: Scoreclass;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private scoreclassService: ScoreclassService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScoreclasses();
    }

    load(id) {
        this.scoreclassService.find(id).subscribe((scoreclass) => {
            this.scoreclass = scoreclass;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScoreclasses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'scoreclassListModification',
            (response) => this.load(this.scoreclass.id)
        );
    }
}
