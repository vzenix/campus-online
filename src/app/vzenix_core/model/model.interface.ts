

/**
 * Base interface for all model data
 */
export interface VZenixModelInterface {

    /** Decode a json string and load it into a class @param {string} json string encoded */
    jsonParse(json: string);

    /** Return the class encoded into a json string */
    jsonStringify();

}
