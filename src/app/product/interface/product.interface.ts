export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  date_release: Date;
  date_revision: Date;
  logo?: string;
}


export interface ResponseProduct {
  data: ProductInterface[];
}


