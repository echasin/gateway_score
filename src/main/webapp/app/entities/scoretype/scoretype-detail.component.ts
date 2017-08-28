import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Scoretype } from './scoretype.model';
import { ScoretypeService } from './scoretype.service';

@Component({
    selector: 'jhi-scoretype-detail',
    templateUrl: './scoretype-detail.component.html'
})
export class ScoretypeDetailComponent implements OnInit, OnDestroy {

    scoretype: Scoretype;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private scoretypeService: ScoretypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScoretypes();
    }

    load(id) {
        this.scoretypeService.find(id).subscribe((scoretype) => {
            this.scoretype = scoretype;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScoretypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'scoretypeListModification',
            (response) => this.load(this.scoretype.id)
        );
    }
}
