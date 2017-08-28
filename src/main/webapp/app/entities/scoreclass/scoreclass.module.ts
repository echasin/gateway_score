import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayScoreSharedModule } from '../../shared';
import {
    ScoreclassService,
    ScoreclassPopupService,
    ScoreclassComponent,
    ScoreclassDetailComponent,
    ScoreclassDialogComponent,
    ScoreclassPopupComponent,
    ScoreclassDeletePopupComponent,
    ScoreclassDeleteDialogComponent,
    scoreclassRoute,
    scoreclassPopupRoute,
    ScoreclassResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...scoreclassRoute,
    ...scoreclassPopupRoute,
];

@NgModule({
    imports: [
        GatewayScoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScoreclassComponent,
        ScoreclassDetailComponent,
        ScoreclassDialogComponent,
        ScoreclassDeleteDialogComponent,
        ScoreclassPopupComponent,
        ScoreclassDeletePopupComponent,
    ],
    entryComponents: [
        ScoreclassComponent,
        ScoreclassDialogComponent,
        ScoreclassPopupComponent,
        ScoreclassDeleteDialogComponent,
        ScoreclassDeletePopupComponent,
    ],
    providers: [
        ScoreclassService,
        ScoreclassPopupService,
        ScoreclassResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayScoreScoreclassModule {}
