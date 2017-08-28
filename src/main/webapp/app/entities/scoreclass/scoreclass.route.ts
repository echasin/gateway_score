import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ScoreclassComponent } from './scoreclass.component';
import { ScoreclassDetailComponent } from './scoreclass-detail.component';
import { ScoreclassPopupComponent } from './scoreclass-dialog.component';
import { ScoreclassDeletePopupComponent } from './scoreclass-delete-dialog.component';

@Injectable()
export class ScoreclassResolvePagingParams implements Resolve<any> {

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

export const scoreclassRoute: Routes = [
    {
        path: 'scoreclass',
        component: ScoreclassComponent,
        resolve: {
            'pagingParams': ScoreclassResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scoreclass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'scoreclass/:id',
        component: ScoreclassDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scoreclass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scoreclassPopupRoute: Routes = [
    {
        path: 'scoreclass-new',
        component: ScoreclassPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scoreclass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scoreclass/:id/edit',
        component: ScoreclassPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scoreclass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scoreclass/:id/delete',
        component: ScoreclassDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayScoreApp.scoreclass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
