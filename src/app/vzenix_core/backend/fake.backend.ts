/**
 * Implementation of the Mock-Backend for testing
 */

import {
    Http, BaseRequestOptions, Response, ResponseOptions,
    RequestMethod, XHRBackend, RequestOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { VZenixUserModel } from '../model/user.model';

export function AppFakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {

    // tslint:disable-next-line:prefer-const
    let userData = new Array<any>();
    userData.push({ id: 1, username: 'user1', token: 'a' });
    userData.push({ id: 2, username: 'user2', token: 'b' });

    // fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        setTimeout(() => {

            if (connection.request.url.endsWith('/login') &&
                connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: { token: 'a' }
                })));

                return;
            }

            if (connection.request.url.endsWith('/login') &&
                connection.request.method === RequestMethod.Get) {
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 204
                })));

                return;
            }

            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
}

export let VZenixCoreFakeBackendProvider = {
    provide: Http,
    useFactory: AppFakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
}
