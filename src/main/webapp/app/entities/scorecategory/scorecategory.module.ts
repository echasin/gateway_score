import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayScoreSharedModule } from '../../shared';
import {
    ScorecategoryService,
    ScorecategoryPopupService,
    ScorecategoryComponent,
    ScorecategoryDetailComponent,
    ScorecategoryDialogComponent,
    ScorecategoryPopupComponent,
    ScorecategoryDeletePopupComponent,
    ScorecategoryDeleteDialogComponent,
    scorecategoryRoute,
    scorecategoryPopupRoute,
    ScorecategoryResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...scorecategoryRoute,
    ...scorecategoryPopupRoute,
];

@NgModule({
    imports: [
        GatewayScoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScorecategoryComponent,
        ScorecategoryDetailComponent,
        ScorecategoryDialogComponent,
        ScorecategoryDeleteDialogComponent,
        ScorecategoryPopupComponent,
        ScorecategoryDeletePopupComponent,
    ],
    entryComponents: [
        ScorecategoryComponent,
        ScorecategoryDialogComponent,
        ScorecategoryPopupComponent,
        ScorecategoryDeleteDialogComponent,
        ScorecategoryDeletePopupComponent,
    ],
    providers: [
        ScorecategoryService,
        ScorecategoryPopupService,
        ScorecategoryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayScoreScorecategoryModule {}
