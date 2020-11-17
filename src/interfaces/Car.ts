export interface ICar {
  id: number;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  kilometers: number;
  details: string;
  price: number;
  photoUrl: string;
}

export interface IMake {
  make: string;
  count: number;
}

export interface IModel {
  model: string;
  count: number;
}
