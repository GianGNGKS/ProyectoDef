// id de producto

export interface IdProducto extends producto {
    id: string
}

// interfaz de producto
export interface producto {
    name?: string,
    price?: number,
    img?: string,
    description?: string, 
    fav? : boolean
}