export class PurchaseOrderDetail {
    id: number ;
    purchaseorder_id:number ;
    purchaserequisitions_id: number;
    product_id: number ;
    unit_price: number;
    quantity: number;
    total: number;
    status: number;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;

  }