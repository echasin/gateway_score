import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ScorerecordtypeComponent } from './scorerecordtype.component';
import { ScorerecordtypeDetailComponent } from './scorerecordtype-detail.component';
import { ScorerecordtypePopupComponent } from './scorerecordtype-dialog.component';
import { ScorerecordtypeDeletePopupComponent } from './scorerecordtype-delete-dialog.component';

@Injectable()
export class ScorerecordtypeResolvePagingParams implements Resolve<any> {

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

export const scorerecordtypeRoute: Routes = [
    {
        path: 'scorerecordtype',
        component: ScorerecordtypeComponent,
        resolve: {
            'pagingParams': ScorerecordtypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorerecordtype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'scorerecordtype/:id',
        component: ScorerecordtypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorerecordtype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scorerecordtypePopupRoute: Routes = [
    {
        path: 'scorerecordtype-new',
        component: ScorerecordtypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorerecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scorerecordtype/:id/edit',
        component: ScorerecordtypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorerecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scorerecordtype/:id/delete',
        component: ScorerecordtypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorerecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
