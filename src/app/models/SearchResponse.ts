import { SearchCard } from "./SearchCard";
export interface SearchResponse {
  query: string;
  items: SearchCard[];
}