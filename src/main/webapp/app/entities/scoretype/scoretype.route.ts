import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ScoretypeComponent } from './scoretype.component';
import { ScoretypeDetailComponent } from './scoretype-detail.component';
import { ScoretypePopupComponent } from './scoretype-dialog.component';
import { ScoretypeDeletePopupComponent } from './scoretype-delete-dialog.component';

@Injectable()
export class ScoretypeResolvePagingParams implements Resolve<any> {

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

export const scoretypeRoute: Routes = [
    {
        path: 'scoretype',
        component: ScoretypeComponent,
        resolve: {
            'pagingParams': ScoretypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scoretype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'scoretype/:id',
        component: ScoretypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scoretype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scoretypePopupRoute: Routes = [
    {
        path: 'scoretype-new',
        component: ScoretypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scoretype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scoretype/:id/edit',
        component: ScoretypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scoretype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scoretype/:id/delete',
        component: ScoretypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scoretype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
