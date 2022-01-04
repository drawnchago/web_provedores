import { Role } from './role';
import { RolePermission } from './role_permission';

export interface User{
    id: number;
    role_id: number;
    name: string;
    firstname: string;
    surname: string;
    password?: string;
    phone?: string;
    cellphone?: string;
    email?: number;
    status?: number;
    img?: any;
    role?: Role;
    rolePermissions?: RolePermission[];
    created_by?: string;
}