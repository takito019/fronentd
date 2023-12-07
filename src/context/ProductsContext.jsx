import { createContext,useContext, useState } from "react"
import {createProductRequest, 
        getProductsRequest,
        deleteProductRequest,
        getProductRequest,
        updateProductRequest
      } from "../api/products";

const ProductsContext = createContext();

export const useProducts = () => {
    const context =useContext(ProductsContext);

    if(!context){
        throw new Error ("useProducts debe estar dentro de un ProductsProvider")
    }

    return context;
}//Fin de UseProducts

export function ProductsProvider( {children}) {
    const [products,setProducts] = useState( []);

    //Funcion para crear un producto
    const createProduct = async (product) =>{
       try {
         //console.log(product);
         await createProductRequest(product);
         getProducts();
         //console.log(res);
       } catch (error) {
        //
       }
    }//Fin de createProduct

    const getProducts = async () =>{
       try {
         const res = await getProductsRequest();
         //asignamos la respuesta del backend al arreglo de productos
         setProducts(res.data);
         //console.log(res);
       } catch (error) {
        console.log(error)
       }
    }//Fin de getProducts

    const deleteProduct = async (id) => {
      try {
        const res = await deleteProductRequest(id);
        //console.log(res.data);
        if(res.status === 200)
        setProducts(products.filter(product => product._id != id));
      } catch (error) {
        console.log(error);
      }
    }//Fin de deleteProducts

    //Función para obtener un producto por id de la base de datos
    const getProduct = async (id) =>{
      try {
        const res= await getProductRequest(id)
        //console.log(res);
        return res.data
      } catch (error) {
        console.log(error);
      }
    } //Fin de getProduct

    //Función para editar un producto de la base de datos
    const updateProduct = async (id, product) => {
      try {
        await updateProductRequest(id,product);
      } catch (error) {
        console.log(error)
      }
    }//Fin de updateProduct

  return (
    <ProductsContext.Provider value={ {
        products,
        createProduct,
        getProducts,
        deleteProduct,
        getProduct,
        updateProduct,
    }}>
        {children}
    </ProductsContext.Provider>
  )
}