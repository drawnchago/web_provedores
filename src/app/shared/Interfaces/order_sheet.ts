export interface OrderSheet {
    id: number;
    work_order_id?: number;
    position_order?: number;
    entry_date?: number;
    user_id?: number;
    zone?: number;
    equipment_description?: string;
    place?: string;
    type?: number;
    description_entry?: string;
    comments_coditions?: string;
    equipment_application?: string;
    handling_fluid?: string;
    work_temperature?: string;
    exposed_pressure?: string;
    number_or_folio_requisition?: number;
     applicant?: string,
    witness?: string,
    status?: number;
    created_at?: string;
    created_by?: number;
    updated_at?: string;
    updated_by?: number;
    priority_id?: number;
}