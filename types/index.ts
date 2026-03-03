export type ProductStatus = "live" | "coming_soon" | "wip" | "beta";
export type ProductCategory =
  | "video"
  | "image"
  | "productivity"
  | "game"
  | "social"
  | "ai"
  | "directory"
  | "marketplace"
  | "education"
  | "utility"
  | "travel"
  | "music"
  | "property"
  | "community";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  status: ProductStatus;
  url?: string;
  downloadUrl?: string;
  imageUrl?: string;
  tags: string[];
  contactEmail?: string;
  featured: boolean;
  order?: number;
}

export interface DevTool {
  id: string;
  name: string;
  url: string;
  category: string;
  icon?: string;
  color: string;
}

export interface AdminSession {
  authenticated: boolean;
}
