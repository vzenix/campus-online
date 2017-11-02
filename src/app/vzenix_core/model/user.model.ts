

import { VZenixModelInterface } from './model.interface';
import { VZenixModelAbstract } from './model.abstract';

/** User model data */
export class VZenixUserModel extends VZenixModelAbstract implements VZenixModelInterface {

    /** ID unsigned int */
    public id: number;

    /** Username */
    public username: string;

    /** Constructor */
    public constructor() { super(); }

    /** {@inheritDoc} */
    public jsonParse(json: string) {
        const res = JSON.parse(json);
        if (!res) {
            throw new Error('Invalid json into VZenixUserModel.jsonParse (1)');
        }

        if (typeof res.id !== typeof 5 || typeof res.username !== typeof 'string' || res.id <= 0 || res.username === '') {
            throw new Error('Invalid json into VZenixUserModel.jsonParse (2)');
        }

        this.id = res.id;
        this.username = res.username;
    }

    /** {@inheritDoc} */
    public jsonStringify() {
        return JSON.stringify(this);
    }
}
