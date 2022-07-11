export interface Metadata {
  name: string;
  tier: number;
  fuels: number;
  solon: number;
  carbon: number;
  region: string;
  crypton: number;
  silicon: number;
  elements: number;
  hydrogen: number;
  hyperion: number;
  landmark: string;
  image_url: string;
  coordinate: string;
}

export enum Landmark {
  FallenStar = 'Fallen Star',
  None = 'None',
  PrimevalMarsh = 'Primeval Marsh'
}
