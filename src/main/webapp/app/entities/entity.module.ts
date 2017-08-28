import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayScoreScoreModule } from './score/score.module';
import { GatewayScoreScorecategoryModule } from './scorecategory/scorecategory.module';
import { GatewayScoreScoreclassModule } from './scoreclass/scoreclass.module';
import { GatewayScoreScorerecordtypeModule } from './scorerecordtype/scorerecordtype.module';
import { GatewayScoreScorestatusModule } from './scorestatus/scorestatus.module';
import { GatewayScoreScoretypeModule } from './scoretype/scoretype.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayScoreScoreModule,
        GatewayScoreScorecategoryModule,
        GatewayScoreScoreclassModule,
        GatewayScoreScorerecordtypeModule,
        GatewayScoreScorestatusModule,
        GatewayScoreScoretypeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayScoreEntityModule {}
