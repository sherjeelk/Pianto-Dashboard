import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {ToastrModule} from 'ngx-toastr';

import {AdminLayoutModule} from './layouts/admin-layout/admin-layout.module';
import { ExtrasComponent } from './pages/extras/extras/extras.component';
import { AddExtrasComponent } from './pages/extras/add-extras/add-extras.component';
import { ExtraDetailsComponent } from './pages/extras/extra-details/extra-details.component';
import { AddPayoutComponent } from './pages/payout/add-payout/add-payout.component';
import { PayoutsComponent } from './pages/payout/payouts/payouts.component';
import { PayoutDetailsComponent } from './pages/payout/payout-details/payout-details.component';
import { AddReviewComponent } from './pages/reviews/add-review/add-review.component';
import { ReviewDetailsComponent } from './pages/reviews/review-details/review-details.component';
import { ReviewsComponent } from './pages/reviews/reviews/reviews.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {RatingModule} from 'ng-starrating';
import {BrowserModule} from '@angular/platform-browser';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LogoutPopupComponent } from './pages/logout-popup/logout-popup.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        NgbModule,
        RouterModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        AdminLayoutModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        RatingModule,
        BrowserModule,
        MatTooltipModule,
        // ToastrModule added
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ExtrasComponent,
    AddExtrasComponent,
    ExtraDetailsComponent,
    AddPayoutComponent,
    PayoutsComponent,
    PayoutDetailsComponent,
    AddReviewComponent,
    ReviewDetailsComponent,
    ReviewsComponent,
    LogoutPopupComponent,

  ],
    providers: [],
  exports: [

  ],
    bootstrap: [AppComponent]
})
export class AppModule { }

