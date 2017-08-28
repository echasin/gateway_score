import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ScorecategoryComponent } from './scorecategory.component';
import { ScorecategoryDetailComponent } from './scorecategory-detail.component';
import { ScorecategoryPopupComponent } from './scorecategory-dialog.component';
import { ScorecategoryDeletePopupComponent } from './scorecategory-delete-dialog.component';

@Injectable()
export class ScorecategoryResolvePagingParams implements Resolve<any> {

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

export const scorecategoryRoute: Routes = [
    {
        path: 'scorecategory',
        component: ScorecategoryComponent,
        resolve: {
            'pagingParams': ScorecategoryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorecategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'scorecategory/:id',
        component: ScorecategoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorecategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scorecategoryPopupRoute: Routes = [
    {
        path: 'scorecategory-new',
        component: ScorecategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorecategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scorecategory/:id/edit',
        component: ScorecategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorecategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scorecategory/:id/delete',
        component: ScorecategoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scorecategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
