export class PurchaseRequsitions {
  id         : number;
  area_id    : number;
  desc_area  : string;
  comments   : string;
  status     : number;
  created_at : Date;
  created_by : string;
  updated_at : Date;
  updated_by : string;
}
export class PurchaseRequsition {
  id         : number;
  area_id    : number;
  desc_area  : string;
  comments   : string;
  status     : number;
  created_at : Date;
  created_by : string;
  updated_at : Date;
  updated_by : string;
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

export class Levels{
  id:number;
  area_id:number;
  user_id:number;
  name:string;
  firstname:string;
  img:string;
  position:string;
  level:number;
  status:number;
  created_at:Date;
  created_by:string;
  updated_at:Date;
  updated_by:string;
}

export class Conversation{
  id:number;
  level_id:number;
  user_id:number;
  name:string;
  firstname:string;
  img:string;
  comments:string;
  created_at:Date;
  created_by:string;
  updated_at:Date;
  updated_by:string;
}