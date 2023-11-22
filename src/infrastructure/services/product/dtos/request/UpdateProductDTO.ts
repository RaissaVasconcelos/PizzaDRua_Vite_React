export interface UpdateProductRequestDTO {
    id: string
    name: string
    description: string
    price: string
    imageUrl: string
    status: string
    size?: string
    type?: string
    category: string

}