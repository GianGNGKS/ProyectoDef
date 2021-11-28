export interface contactoID extends IContacto{
    id: string;
}

export interface IContacto{
    negocioName?: string;
    pnumber?: number;
    address?: string;
    facebook?: string;
    instagram?: string;
    mercadoLibre?: string;
}