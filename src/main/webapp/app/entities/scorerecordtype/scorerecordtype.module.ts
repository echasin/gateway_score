import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayScoreSharedModule } from '../../shared';
import {
    ScorerecordtypeService,
    ScorerecordtypePopupService,
    ScorerecordtypeComponent,
    ScorerecordtypeDetailComponent,
    ScorerecordtypeDialogComponent,
    ScorerecordtypePopupComponent,
    ScorerecordtypeDeletePopupComponent,
    ScorerecordtypeDeleteDialogComponent,
    scorerecordtypeRoute,
    scorerecordtypePopupRoute,
    ScorerecordtypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...scorerecordtypeRoute,
    ...scorerecordtypePopupRoute,
];

@NgModule({
    imports: [
        GatewayScoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScorerecordtypeComponent,
        ScorerecordtypeDetailComponent,
        ScorerecordtypeDialogComponent,
        ScorerecordtypeDeleteDialogComponent,
        ScorerecordtypePopupComponent,
        ScorerecordtypeDeletePopupComponent,
    ],
    entryComponents: [
        ScorerecordtypeComponent,
        ScorerecordtypeDialogComponent,
        ScorerecordtypePopupComponent,
        ScorerecordtypeDeleteDialogComponent,
        ScorerecordtypeDeletePopupComponent,
    ],
    providers: [
        ScorerecordtypeService,
        ScorerecordtypePopupService,
        ScorerecordtypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayScoreScorerecordtypeModule {}
