import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TempletesComponent } from './templetes/templetes.component';
import { AwsComponent } from './aws/aws.component';
import { IntegrationComponent } from './integration/integration.component';
import { ExcelComponent } from './excel/excel.component';

const routes: Routes = [
  {
    path: 'temp',

    component: TempletesComponent
  },
  {
    path: 'aws',

    component: AwsComponent
  },{
    path:'integration',
    component:IntegrationComponent
  },
  {
    path:'excel',
    component:ExcelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
