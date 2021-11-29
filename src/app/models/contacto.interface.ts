// id de contacto p/ contacto
export interface contactoID extends IContacto{
    id: string;
}

//interfaz de contacto
export interface IContacto{
    negocioName?: string;
    pnumber?: number;
    address?: string;
    facebook?: string;
    instagram?: string;
    mercadoLibre?: string;
}