import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ScorestatusComponent } from './scorestatus.component';
import { ScorestatusDetailComponent } from './scorestatus-detail.component';
import { ScorestatusPopupComponent } from './scorestatus-dialog.component';
import { ScorestatusDeletePopupComponent } from './scorestatus-delete-dialog.component';

@Injectable()
export class ScorestatusResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const scorestatusRoute: Routes = [
    {
        path: 'scorestatus',
        component: ScorestatusComponent,
        resolve: {
            'pagingParams': ScorestatusResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorestatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'scorestatus/:id',
        component: ScorestatusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorestatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scorestatusPopupRoute: Routes = [
    {
        path: 'scorestatus-new',
        component: ScorestatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorestatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scorestatus/:id/edit',
        component: ScorestatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorestatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scorestatus/:id/delete',
        component: ScorestatusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorestatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
