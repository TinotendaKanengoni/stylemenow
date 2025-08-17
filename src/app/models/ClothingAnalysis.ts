export interface ClothingAnalysis {
  clothingAnalysis_Id?: number;
  fileName: string;
  dominantColor: string;
  isDark: boolean;
  isWarm: boolean;
  uploadDate?: string;
  detectedItemType?: string; 
}