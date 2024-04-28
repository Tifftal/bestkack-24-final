export type ProductType = {
    product: Product,
    amount: number,
    totalSpend: number,
};

export type Product = {
    id: string,
    name: string,
    price: number,
    description: string,
}
