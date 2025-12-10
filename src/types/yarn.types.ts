export interface IYarnSchema {
  _id: string;
  name: string;
  color: string;
  colorTag: string;
  company: string;
  materials: Record<string, number>; // {cotton: 50%, wool: 50%}
  image: string;
  userId?: string;

  // future - add hook size && washer instructions
  // if il need - patterns connections? - no relevant now! (:)

  // Should create new db for this? 
  // companyToPurchaseFrom: string;
  // cost 
  // PurchaseUrl
}


export interface IYarnsResponse {
  message: string;
  data: IYarnSchema[];
  page: number;
  nextPage: number | null;
  prevPage: number | null;
  count: number;
  totalPages: number;
  status: number;
}