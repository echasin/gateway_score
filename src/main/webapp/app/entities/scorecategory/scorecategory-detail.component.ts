import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Scorecategory } from './scorecategory.model';
import { ScorecategoryService } from './scorecategory.service';

@Component({
    selector: 'jhi-scorecategory-detail',
    templateUrl: './scorecategory-detail.component.html'
})
export class ScorecategoryDetailComponent implements OnInit, OnDestroy {

    scorecategory: Scorecategory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private scorecategoryService: ScorecategoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScorecategories();
    }

    load(id) {
        this.scorecategoryService.find(id).subscribe((scorecategory) => {
            this.scorecategory = scorecategory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScorecategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'scorecategoryListModification',
            (response) => this.load(this.scorecategory.id)
        );
    }
}
