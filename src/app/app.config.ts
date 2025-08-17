import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // ✅ fixes "No provider for HttpClient"
    provideHttpClient(withInterceptorsFromDi()),

    // Optional (you also import FormsModule inside the component; keeping this is fine)
    importProvidersFrom(FormsModule),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // You’re using SSR/hydration — this is correct
    provideClientHydration(withEventReplay()),
  ],
};
