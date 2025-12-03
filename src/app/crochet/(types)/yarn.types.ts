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
