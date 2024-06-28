import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers:
    [provideRouter(routes), provideAnimationsAsync(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "simple-crm-f05eb", "appId": "1:434839343737:web:205df81f524471b86d7aa8", "storageBucket": "simple-crm-f05eb.appspot.com", "apiKey": "AIzaSyDcPlI7CVvMaKmFn7xvsqP5B-W7rkkeWcc", "authDomain": "simple-crm-f05eb.firebaseapp.com", "messagingSenderId": "434839343737" }))),
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
