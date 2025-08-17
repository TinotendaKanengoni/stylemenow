// src/app/services/color-analysis.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalysisResult } from '../models/AnalysisResult';
import { environment } from '../../environments/environment';

export type Analyzer = 'local' | 'azure';

@Injectable({ providedIn: 'root' })
export class ColorAnalysisService {
  private readonly base = (environment.apiBaseUrl || '').replace(/\/+$/, '');

  constructor(private http: HttpClient) {}

  analyze(file: File, analyzer: Analyzer): Observable<AnalysisResult> {
    const form = new FormData();
    form.append('file', file);

    // Hit the real API endpoint, not "/"
    // If your backend prefers a route segment instead of a query, change to:
    // `${this.base}/api/ColorAnalysis/analyze/${analyzer}`
    const url = `${this.base}/api/ColorAnalysis/analyze?engine=${analyzer}`;

    return this.http.post<AnalysisResult>(url, form);
  }
}
