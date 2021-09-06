
export interface WorkOrder{
    id: number;
    type_bomb_id: number;
    customer_id:number ,
    brand_id:number ,
    model_id:number ,
    size:number ,
    stock: number,
    exit_pass:string ,
    rpm: string,
    hp: string,
    evaluation: string,
    set: string,
    total_length_quantity: number,
    total_diameter_quantity: number,
    total_weight_quantity: number,
    total_length_description: string,
    total_diameter_description: string,
    total_weight_description: string,
    status?: number;
    created_by?: string;
    updated_by?: string;
}