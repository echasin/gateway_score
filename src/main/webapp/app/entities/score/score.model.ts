import { BaseEntity } from './../../shared';

export class Score implements BaseEntity {
    constructor(
        public id?: number,
        public scorevalue?: string,
        public comment?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public scorestatus?: BaseEntity,
        public scorerecordtype?: BaseEntity,
        public scoreclass?: BaseEntity,
        public scorecategory?: BaseEntity,
        public scoretype?: BaseEntity,
    ) {
    }
}
