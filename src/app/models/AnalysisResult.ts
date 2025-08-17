import { ClothingAnalysis } from "./ClothingAnalysis";
import { ClothingMatch } from "./ClothingMatch";
export interface AnalysisResult {
  analysis: ClothingAnalysis;
  matches: ClothingMatch[];
}