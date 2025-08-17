import { Routes } from '@angular/router';
import { AnalyzeAndShopComponent } from './analyze-and-shop/analyze-and-shop.component';
import { OutfitResultsComponent } from './outfit-results/outfit-results.component';

export const routes: Routes = [
     { path: '', component: AnalyzeAndShopComponent },
     { path: 'outfit-results', component: OutfitResultsComponent },
     { path: 'analyze', component: AnalyzeAndShopComponent },
  { path: '**', redirectTo: '' }
];
