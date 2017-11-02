
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response, Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { VZENIX_URI_BASE } from '../vzenix.core.constant';

/** Comm service */
@Injectable()
export class VZenixCoreHttpService {

    /** Set type of send: json or application/x-www-form-urlencoded, false = json */
    private urlEncoded = true;

    /**
     * Constructor
     * @param {Http} http
     */
    constructor(
        private http: Http,
        private router: Router
    ) { }

    /**
     * Set sending type, json o application/x-www-form-urlencoded, false = json
     * @param {boolean} b
     */
    public setBodyUrlEncoded(b?: boolean) {
        this.urlEncoded = (b === true);
    }

    /**
     * GET request
     * @param {string} url
     * @param {object} param
     */
    public get(url: string, param?) {
        if (param) {
            url += '?g=1';
            const properties = Object.getOwnPropertyNames(param);
            for (let i = 0; i < properties.length; i++) {
                url += '&' + properties[i] + '=' + param[properties[i]];
            }
        }

        const headers = this.createnHeaders();
        const options = new RequestOptions({ headers: headers });
        return this.http.get(VZENIX_URI_BASE + url, options).catch((err: Response) => {

            // Die token
            if (err.status === 401) {
                localStorage.removeItem('VZenixCurrentUser');
                this.router.navigate(['/login']);
                document.location.reload();
            }

            throw err;
        });
    }

    /**
     * POST request
     * @param {string} url
     * @param {object} data propiedades a envíar vía POST
     */
    public post(url, data) {
        const headers = this.createnHeaders();
        const options = new RequestOptions({ headers: headers });

        if (this.urlEncoded) {
            // tslint:disable-next-line:prefer-const
            let encodedData = new URLSearchParams();
            const properties = Object.getOwnPropertyNames(data);
            for (let i = 0; i < properties.length; i++) {
                encodedData.append(properties[i], data[properties[i]]);
            }

            return this.http.post(VZENIX_URI_BASE + url, encodedData, options);
        }

        return this.http.post(url, data, options);
    }

    /**
     * DELETE request
     * @param {string} url
     * @param {object} param
     */
    public delete(url: string, param?) {
        if (param) {
            url += '?g=1';
            let properties = Object.getOwnPropertyNames(param);
            for (let i = 0; i < properties.length; i++) {
                url += '&' + properties[i] + '=' + param[properties[i]];
            }
        }

        const headers = this.createnHeaders();
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(VZENIX_URI_BASE + url, options).catch((err: Response) => {

            // Die token
            if (err.status === 401) {
                localStorage.removeItem('VZenixCurrentUser');
                this.router.navigate(['/login']);
                document.location.reload();
            }

            throw err;
        });
    }

    /**
     * Set session headers
     * @return {Header}
     */
    private createnHeaders() {
        const currentUser = JSON.parse(localStorage.getItem('VZenixCurrentUser'));
        const token = currentUser && currentUser.token;
        if (currentUser && currentUser.token) {
            return new Headers({'Authorization': 'Bearer ' + token});
        }

        return new Headers();
    }

}