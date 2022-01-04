export class Provider {
  id             : number;
  state_id       : number;
  municipality_id: number;
  desc_state     : string;
  desc_mun       : string;
  name           : string;
  rfc            : string;
  address        : string;
  cp             : string;
  phone          : string;
  status         : number;
  updated_by     : string;
  updated_at     : Date;
  created_by     : string;
  created_at     : Date;
}
export class Municipalities {
  id          : number;
  description : string;
  status      : number;
  created_at  : Date;
  created_by  : string;
  updated_at  : Date;
  updated_by  : string;
}
export class States {
  id          : number;
  description : string;
  status      : number;
  created_at  : Date;
  created_by  : string;
  updated_at  : Date;
  updated_by  : string;
}