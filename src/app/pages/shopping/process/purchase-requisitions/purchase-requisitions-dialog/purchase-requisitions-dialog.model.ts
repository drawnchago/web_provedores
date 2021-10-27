export class PurchaseRequistion {
  id          : number;
  description : string;
  status      : number;
  created_at  : Date;
  created_by  : string;
  updated_at  : Date;
  updated_by  : string;
}
export class RequistionDetails{
  id          : number;
  product_id  : number;
  desc_product: string;
  unit_price  : number;
  quantity    : number;
  subtotal    : number;
  status      : number;
  created_at  : Date;
  created_by  : string;
  updated_at  : Date;
  updated_by  : string;
}