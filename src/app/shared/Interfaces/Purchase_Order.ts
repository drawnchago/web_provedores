export class PurchaseOrder {
  id: number;
  area_id: number;
  desc_area: string;
  comments: string;
  provider_id: number;
  subtotal: number;
  total: number;
  authorization_date: Date;
  authorization_by: number;
  status: number;
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
}