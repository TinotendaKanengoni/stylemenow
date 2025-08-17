import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutfitSearchService } from '../services/outfit-search.service';
import { SearchCard } from '../models/SearchCard';

@Component({
  selector: 'app-outfit-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outfit-results.component.html',
  styleUrls: ['./outfit-results.component.scss']
})
export class OutfitResultsComponent implements OnChanges {
  @Input() color = '';
  @Input() itemType = '';
  @Input() style?: string;
  @Input() limit = 8;

  loading = false;
  error?: string;
  items: SearchCard[] = [];

  constructor(private api: OutfitSearchService) {}

  ngOnChanges() {
    if (!this.color || !this.itemType) {
      this.items = [];
      return;
    }
    this.loading = true;
    this.error = undefined;

    this.api.search(this.color, this.itemType, this.style, this.limit).subscribe({
      next: (res) => {
        this.items = res?.items ?? [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch outfit suggestions.';
        this.loading = false;
      }
    });
  }
}
