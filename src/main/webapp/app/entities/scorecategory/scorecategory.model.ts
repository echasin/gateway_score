import { BaseEntity } from './../../shared';

export class Scorecategory implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public nameshort?: string,
        public description?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public scorestatus?: BaseEntity,
        public scoreclass?: BaseEntity,
    ) {
    }
}
