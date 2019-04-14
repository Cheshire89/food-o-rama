import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { switchMap, take } from 'rxjs/operators';
import * as fromApp from '../ngrx/app.reducers';
import * as fromAuth from '../auth/ngrx/auth.reducers';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private store: Store<fromApp.AppState>
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // console.log(`${req.method} -> ${req.url}`, req.body);
        return this.store.select('auth').pipe(
            take(1),
            switchMap((authState: fromAuth.State) => {
                const reqCopy = req.clone({
                    params: req.params.set('auth', authState.token)
                });
                return req.method !== 'GET' ? next.handle(reqCopy) : next.handle(req);
            })
        );
    }
}