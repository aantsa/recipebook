import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;
    
    private closedSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObservable: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoginMode) {
            authObservable = this.authService.login(email, password)
        } else {
            authObservable = this.authService.signup(email, password)
        }

        authObservable.subscribe(res => {
            console.log(res);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        });
        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    ngOnDestroy(): void {
        if(this.closedSub){
            this.closedSub.unsubscribe();
        }
    }

    private showErrorAlert(errorMessage: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = errorMessage;
        this.closedSub = componentRef.instance.close.subscribe(() => {
            this.closedSub.unsubscribe();
            hostViewContainerRef.clear();
        });

    }
}