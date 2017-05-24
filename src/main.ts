import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app/app.module'
import { environment } from './environment'

if (process.env.NODE_ENV) {
    environment.production = true
}

if (environment.production) {
    enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule);
