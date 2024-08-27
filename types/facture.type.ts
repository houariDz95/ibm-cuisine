import { Document } from 'mongoose';

export interface IVercement {
  amount: number;
  date: string; // or Date if you prefer a Date object
}

export interface IFacture extends Document {
  _id: string;
  name: string;
  address: string;
  vercement: IVercement[]; // Array of vercement objects
  totalVercement: number; // Virtual field
  total: number; // Virtual field
  createdAt: string;
  phone: number;
  isCompleted: boolean;
  items: {
    product: string;
    price: number;
  }[];
}

