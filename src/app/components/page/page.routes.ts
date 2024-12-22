import { Routes } from "@angular/router";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { PageResolver } from "../../shared/resolver/page.resolver";
import { Error404Component } from "./error404/error404.component";
 
export const page: Routes = [
    {
        path: 'about-us',
        component: AboutUsComponent
    },
    {
        path: 'contact-us',
        component: ContactUsComponent
    },
  
    {
        path: '404',
        component: Error404Component,
    }

    
]
