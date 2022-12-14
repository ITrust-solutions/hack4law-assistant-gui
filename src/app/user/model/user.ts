import { Role } from './role';

export interface User {
    id: string;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: Role;
}