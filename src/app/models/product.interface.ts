export interface IdProducto extends producto {
    id: string
}

export interface producto {
    name: string,
    price: number,
    img: string,
    description: string
}