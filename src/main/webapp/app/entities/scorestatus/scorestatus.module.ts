import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayScoreSharedModule } from '../../shared';
import {
    ScorestatusService,
    ScorestatusPopupService,
    ScorestatusComponent,
    ScorestatusDetailComponent,
    ScorestatusDialogComponent,
    ScorestatusPopupComponent,
    ScorestatusDeletePopupComponent,
    ScorestatusDeleteDialogComponent,
    scorestatusRoute,
    scorestatusPopupRoute,
    ScorestatusResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...scorestatusRoute,
    ...scorestatusPopupRoute,
];

@NgModule({
    imports: [
        GatewayScoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScorestatusComponent,
        ScorestatusDetailComponent,
        ScorestatusDialogComponent,
        ScorestatusDeleteDialogComponent,
        ScorestatusPopupComponent,
        ScorestatusDeletePopupComponent,
    ],
    entryComponents: [
        ScorestatusComponent,
        ScorestatusDialogComponent,
        ScorestatusPopupComponent,
        ScorestatusDeleteDialogComponent,
        ScorestatusDeletePopupComponent,
    ],
    providers: [
        ScorestatusService,
        ScorestatusPopupService,
        ScorestatusResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayScoreScorestatusModule {}
