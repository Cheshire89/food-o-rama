import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const reqCopy = req.clone({
            params: req.params.set('auth', this.authService.token)
        });
        console.log(`${req.method} -> ${req.url}`, req.body);
        return req.method !== 'GET' ? next.handle(reqCopy) : next.handle(req);
    }
}