import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule, MatBadgeModule, MatTreeModule,MatToolbarModule, MatInputModule } from '@angular/material';
import { TempletesComponent } from './templetes/templetes.component';
import { AwsComponent } from './aws/aws.component';
import { IntegrationComponent } from './integration/integration.component';
import { ExcelComponent } from './excel/excel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ParticlesModule } from 'angular-particle';
@NgModule({
  declarations: [
    AppComponent,
    TempletesComponent,
    AwsComponent,
    IntegrationComponent,
    ExcelComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    ParticlesModule,
    MatBadgeModule,
    MatTreeModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
