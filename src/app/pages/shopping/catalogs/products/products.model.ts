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
  status                     : number;
  created_at                 : Date;
  created_by                 : string;
  updated_at                 : Date;
  updated_by                 : string;
}
export class Classifications {
  id          : number;
  description : string;
  status      : number;
  created_at  : Date;
  created_by  : string;
  updated_at  : Date;
  updated_by  : string;
}
export class TypeOfProducts {
  id          : number;
  description : string;
  status      : number;
  created_at  : Date;
  created_by  : string;
  updated_at  : Date;
  updated_by  : string;
}
export class MeasurementUnits {
  id          : number;
  description : string;
  status      : number;
  created_at  : Date;
  created_by  : string;
  updated_at  : Date;
  updated_by  : string;
}