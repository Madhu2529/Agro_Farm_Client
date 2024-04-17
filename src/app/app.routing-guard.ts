import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EkartRoutingGuard implements CanActivate {
    constructor(private route: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let userType = sessionStorage.getItem("userType");
        let toRet: boolean = false;
        if (userType != null ) {
            if(sessionStorage.getItem("customer") != null) {
                toRet = true;
            } else if(sessionStorage.getItem("seller") != null){
                toRet = true;
            }
        }

        if(toRet) {
            return toRet;
        } else {
            this.route.navigate(["error"]);
            return toRet;
        }
    }

}