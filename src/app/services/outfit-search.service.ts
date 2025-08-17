// src/app/services/outfit-search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResponse } from '../models/SearchResponse';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OutfitSearchService {
  // trim any trailing slashes to avoid // in URLs
  private readonly base = (environment.apiBaseUrl || '').replace(/\/+$/, '');

  constructor(private http: HttpClient) {}

  search(color: string, itemType: string, style?: string, limit = 8): Observable<SearchResponse> {
    let params = new HttpParams()
      .set('color', color)
      .set('itemType', itemType)
      .set('limit', String(limit));
    if (style) params = params.set('style', style);

    // adjust the path if your controller route differs
    const url = `${this.base}/api/AzureColorAnalysis/pexels`;
    return this.http.get<SearchResponse>(url, { params });
  }
}
