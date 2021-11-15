export interface IdProducto extends producto {
    id: string
}

export interface producto {
    name: string,
    price: number,
    size: string,
    img: string,
    description: string
}