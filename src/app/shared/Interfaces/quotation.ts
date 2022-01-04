import { Customer } from "src/app/pages/admon/catalogs/customers/customers-dialog/customers-dialog.model";

export interface Quotation{
    id: number;
    //customer_id: number;
    order_ids: number[];
    comments: string;
    opportunity_id: number;
    branch_office_id: number;
    activity_id: number;
    contact: string;  
    telephone: string;  
    email: string; 
    sent: number;
    status: number;
    accepted: number;
    concepts: QuotationConcept[];
    customer: Customer;
    discount :number;
    discount_p: number;
    import: number;
    exchange: string;
    subtotal: number;
    iva: number;
    total: number;
    created?: string;
    created_at: Date;
    created_by: number;
    updated_at: Date;
    updated_by: number;
}

export interface QuotationConcept{
    id: number;
    quotation_id: number;
    concept_id: number;
    code: string;
    description: string;
    unit: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    concept_comment: string;
    status: number;
    created_at: Date;
    created_by: number;
    updated_at: Date;
    updated_by: number;
}