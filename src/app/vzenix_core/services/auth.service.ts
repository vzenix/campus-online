
import { Injectable, OnDestroy } from '@angular/core';

import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';

import { VZenixCoreHttpService } from './http.service';

@Injectable()
export class VZenixCoreAuthService implements OnDestroy {

    /** Logout observer for clear when service is destroyed */
    private subLogout: ISubscription;

    /** Observable for login call */
    private observerLogin;

    /** if is sending login request */
    private sendingLogin = false;

    /**
     * Constructor
     * @param http
     */
    public constructor(private http: VZenixCoreHttpService) { }

    /**
     * Auth an user
     * @param username
     * @param password
     * @return {Observable}
     */
    public login(username: string, password: string): Observable<boolean> {

        const currentUser = JSON.parse(localStorage.getItem('VZenixCurrentUser'));
        const token = currentUser && currentUser.token;
        if (currentUser && currentUser.token) {
            return new Observable(observer => {
                observer.next(true);
                observer.complete();
            });
        }

        // Check no send multiple login request
        if (this.sendingLogin) {
            return this.observerLogin;
        }

        this.sendingLogin = true;
        this.observerLogin = this.http
            .post('/login', { username: username, password: password })
            .map((response: Response) => {
                this.sendingLogin = false;

                try {
                    if (response.json() && response.json().token) {
                        localStorage.setItem('VZenixCurrentUser', JSON.stringify({ username: username, token: token }));
                        return true;
                    }

                } catch (e) {
                    console.warn(e);
                    console.warn(response);
                }

                return false;
            })
            .catch((err: Response | any) => {
                this.sendingLogin = false;
                return Observable.throw(err);
            });
    }

    /**
     * Close session of an autenticated user
     * @return {Observable}
     */
    public logout(): Observable<any> {
        if (this.subLogout) {
            this.subLogout.unsubscribe();
        }

        localStorage.removeItem('VZenixCurrentUser');
        this.subLogout = this.http.get('/logout').subscribe();
        return new Observable(observer => {
            observer.next(true);
            observer.complete();
        });
    }

    /** {@inheritDoc} */
    public ngOnDestroy() {
        if (this.subLogout) {
            this.subLogout.unsubscribe();
        }
    }

}
