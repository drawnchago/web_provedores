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
export class Areas {
  id          : number;
  description : string;
  status      : number;
  created_at  : Date;
  created_by  : string;
  updated_at  : Date;
  updated_by  : string;
}
export class Users {
  id          	  : number;
  role_id     	  : number;
  name        	  : string;
  firstname   	  : string;
  surname     	  : string;
  username    	  : string;
  password    	  : string;
  email       	  : string;
  phone       	  : string;
  cellphone   	  : string;
  street      	  : string;
  int_number  	  : string;
  out_number  	  : string;
  postal_code 	  : string;
  state_id    	  : number;
  municipality_id : string;
  status          : number;
  deleted         : string;
  img             : string;
  created_at      : Date;
  updated_at      : Date;
  created_by      : string;
  updated_by      : string;
}
export class Products {
  id                         : number;
  measurement_unit_id        : number;
  classification_id          : number;
  type_product_id            : number;
  code                       : string;
  description                : string;
  measurement_description    : string;
  classification_description : string;
  type_product_description   : string;
  total                      : number;
  status                     : number;
  created_at                 : Date;
  created_by                 : string;
  updated_at                 : Date;
  updated_by                 : string;
}

export class Concept{
  id          : number;
  product_id  : number;
  position    : number;
  code        : string;
  description : string;
  price       : number;
  quantity    : number;
  subtotal    : number;

  constructor(id:number,product_id:number,position:number,code:string,description:string,price:number,quantity:number,subtotal:number){
    this.id          = id;
    this.product_id  = product_id;
    this.position    = position;
    this.code        = code;
    this.description = description;
    this.price       = price;
    this.quantity    = quantity;
    this.subtotal    = subtotal;
  }
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