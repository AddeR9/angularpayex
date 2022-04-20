import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyComponent } from './buy/buy.component';
import { CallbackurlComponent } from './callbackurl/callbackurl.component';

const routes: Routes = [
  {path: '', component: BuyComponent},
  {path: 'callbackurl', component: CallbackurlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
