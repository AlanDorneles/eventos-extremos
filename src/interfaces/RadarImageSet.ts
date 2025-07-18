// interfaces/RedemetImages.ts

export interface RadarImageEntry {
  cn: string | null;
  mi: string | null;
  sg: string | null;
}


export interface RedemetImages {
  "03km": RadarImageEntry[];
  "05km":RadarImageEntry[]
  "07km": RadarImageEntry[];
  "10km": RadarImageEntry[];
  "maxcappi": RadarImageEntry[];
}

export type RadarProductKey = "03km" | "05km" | "07km" | "10km" | "maxcappi";