import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Scorestatus } from './scorestatus.model';
import { ScorestatusService } from './scorestatus.service';

@Component({
    selector: 'jhi-scorestatus-detail',
    templateUrl: './scorestatus-detail.component.html'
})
export class ScorestatusDetailComponent implements OnInit, OnDestroy {

    scorestatus: Scorestatus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private scorestatusService: ScorestatusService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScorestatuses();
    }

    load(id) {
        this.scorestatusService.find(id).subscribe((scorestatus) => {
            this.scorestatus = scorestatus;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScorestatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'scorestatusListModification',
            (response) => this.load(this.scorestatus.id)
        );
    }
}
