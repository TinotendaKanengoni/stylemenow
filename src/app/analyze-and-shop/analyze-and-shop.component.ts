import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ColorAnalysisService, Analyzer } from '../services/color-analysis.service';
import { AnalysisResult } from '../models/AnalysisResult';
import { ClothingMatch } from '../models/ClothingMatch';

import { OutfitSearchService } from '../services/outfit-search.service';
import { SearchCard } from '../models/SearchCard';

@Component({
  selector: 'app-analyze-and-shop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analyze-and-shop.component.html',
  styleUrls: ['./analyze-and-shop.component.scss']
})
export class AnalyzeAndShopComponent implements OnInit {
  // welcome / typing
  userName = ''; // change as you like
  typed = '';
  private slogan = 'How can I style you today?';

  // upload/preview
  file?: File;
  previewUrl?: string;

  // analyzer
  analyzer: Analyzer = 'azure';
  loading = false;
  error?: string;
  result?: AnalysisResult;

  // for search
  selectedMatch?: ClothingMatch;
  searchColor = '';
  searchItemType = '';
  searchStyle?: string;

  // dropdown options
  COLORS = [
    'Black','White','Light Gray','Gray','Dark Gray',
    'Navy Blue','Midnight Blue','Indigo','Cobalt','Royal Blue',
    'Teal','Green','Olive','Brown','Khaki','Beige','Cream',
    'True Red','Scarlet','Crimson','Burgundy',
    'Safety Orange','Orange','Tangerine','Amber','Yellow','Gold','Mustard',
    'Pink','Purple'
  ];
  ITEM_TYPES = ['T-shirt','Polo','Shirt','Hoodie','Jacket','Dress','Jeans','Chinos','Shorts','Skirt'];
  STYLES = ['Casual','Business casual','Smart casual','Formal','Streetwear','Athleisure'];

  // ideas (inline)
  ideas: SearchCard[] = [];
  ideasLoading = false;
  ideasError?: string;

  constructor(
    private api: ColorAnalysisService,
    private outfit: OutfitSearchService
  ) {}

  ngOnInit() {
    // simple typewriter effect
    let i = 0;
    const h = setInterval(() => {
      this.typed = this.slogan.slice(0, i++);
      if (i > this.slogan.length) clearInterval(h);
    }, 60);
  }

  onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.file = input.files[0];

      // preview
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result as string);
      reader.readAsDataURL(this.file);
    }
  }

  runAnalyze() {
    if (!this.file) { this.error = 'Choose an image first'; return; }
    this.loading = true; this.error = undefined; this.result = undefined;
    this.ideas = []; this.ideasError = undefined;

    this.api.analyze(this.file, this.analyzer).subscribe({
      next: (res) => {
        this.result = res;

        // default search params
        if (res.matches?.length) {
          this.selectedMatch = res.matches[0];
          this.applyMatchToSearch();
        } else {
          this.searchColor = res.analysis.dominantColor;
          this.searchItemType = res.analysis.detectedItemType || 'T-shirt';
          this.searchStyle = 'Casual';
        }

        this.loading = false;

        // kick off ideas immediately (works if /api/OutfitSearch is wired)
        this.fetchIdeas();
      },
      error: () => {
        this.error = 'Analysis failed.';
        this.loading = false;
      }
    });
  }

  applyMatchToSearch() {
    if (!this.result || !this.selectedMatch) return;
    this.searchColor = this.selectedMatch.color || this.result.analysis.dominantColor;
    this.searchItemType =
      this.selectedMatch.itemType ||
      this.result.analysis.detectedItemType ||
      'T-shirt';
    this.searchStyle = this.selectedMatch.style || undefined;
  }

  fetchIdeas() {
    this.ideasError = undefined;
    this.ideas = [];

    if (!this.searchColor || !this.searchItemType) return;

    this.ideasLoading = true;
    this.outfit.search(this.searchColor, this.searchItemType, this.searchStyle, 8).subscribe({
      next: res => { this.ideas = res.items || []; this.ideasLoading = false; },
      error: _ => { this.ideasLoading = false; this.ideasError = 'Outfit ideas service is not available yet.'; }
    });
  }
}
