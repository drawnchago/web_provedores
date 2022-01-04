export class Customer{
  id                : number;
  name              : string;
  description       : string;
  adress            : string;
  subrub            : string;
  municipality_id   : number;
  state_id          : number;
  telephone         : string;
  rfc               : string;
  cp                : string;
  cfdi_id           : number;
  contact_purchase  : string;
  contact_payments  : string;
  bank_id           : number;
  email             : string;
  days              : number;
  account_bank      : number;
  kind_of_person_id : number;
  credit_limit      : number;
  status            : number;
  updated_at        : Date;
  updated_by        : string;
  created_at        : Date;
  created_by        : string;
}

export class Bank{
 id          : number;
 name        : string;
 description : string;
 status      : number;
 updated_at  : Date;
 updated_by  : string;
 created_at  : Date;
 created_by  : string;
}

export class KindOfPerson{
  id          : number;
  name        : string;
  description : string;
  status      : number;
  updated_at  : Date;
  updated_by  : string;
  created_at  : Date;
  created_by  : string;
 }
 export class Cfdi{
  id          : number;
  code        : string;
  description : string;
  status      : number;
  updated_at  : Date;
  updated_by  : string;
  created_at  : Date;
  created_by  : string;
 }