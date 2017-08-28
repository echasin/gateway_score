import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Scorerecordtype } from './scorerecordtype.model';
import { ScorerecordtypeService } from './scorerecordtype.service';

@Component({
    selector: 'jhi-scorerecordtype-detail',
    templateUrl: './scorerecordtype-detail.component.html'
})
export class ScorerecordtypeDetailComponent implements OnInit, OnDestroy {

    scorerecordtype: Scorerecordtype;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private scorerecordtypeService: ScorerecordtypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScorerecordtypes();
    }

    load(id) {
        this.scorerecordtypeService.find(id).subscribe((scorerecordtype) => {
            this.scorerecordtype = scorerecordtype;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScorerecordtypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'scorerecordtypeListModification',
            (response) => this.load(this.scorerecordtype.id)
        );
    }
}
