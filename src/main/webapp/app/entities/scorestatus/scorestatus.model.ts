import { BaseEntity } from './../../shared';

export class Scorestatus implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public nameshort?: string,
        public description?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
    ) {
    }
}
