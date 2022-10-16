export interface User {
    id: number;
    shared: boolean;
    email: string;
    token: string;
}

export interface UserDTO {
    id: number;
    shared: boolean;
    email: string; 
}