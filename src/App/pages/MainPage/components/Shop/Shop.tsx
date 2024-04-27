import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "api/products/index";
import { setProducts } from "store/ProductsSlice/ProductsSlice";
import { selectProducts } from "store/ProductsSlice/productSelector";

const Shop = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);

    useEffect(() => {
        getProducts()
        .then(({data, status}) => {
            if (status === 200) {
                dispatch(setProducts(data))
            }
        })
        .catch(err => {
            console.error('Error occurred while fetching products data, err: ', err);
        }) 
    }, []);

    console.log('products', products)

    return (
        <>sdfsdf</>
    )
}

export default Shop;

