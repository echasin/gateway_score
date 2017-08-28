import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayScoreSharedModule } from '../../shared';
import {
    ScoretypeService,
    ScoretypePopupService,
    ScoretypeComponent,
    ScoretypeDetailComponent,
    ScoretypeDialogComponent,
    ScoretypePopupComponent,
    ScoretypeDeletePopupComponent,
    ScoretypeDeleteDialogComponent,
    scoretypeRoute,
    scoretypePopupRoute,
    ScoretypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...scoretypeRoute,
    ...scoretypePopupRoute,
];

@NgModule({
    imports: [
        GatewayScoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScoretypeComponent,
        ScoretypeDetailComponent,
        ScoretypeDialogComponent,
        ScoretypeDeleteDialogComponent,
        ScoretypePopupComponent,
        ScoretypeDeletePopupComponent,
    ],
    entryComponents: [
        ScoretypeComponent,
        ScoretypeDialogComponent,
        ScoretypePopupComponent,
        ScoretypeDeleteDialogComponent,
        ScoretypeDeletePopupComponent,
    ],
    providers: [
        ScoretypeService,
        ScoretypePopupService,
        ScoretypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayScoreScoretypeModule {}
