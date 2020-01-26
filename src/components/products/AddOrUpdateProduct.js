import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";

function AddOrUpdateProduct({
  propducts,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history, // reactan geliyor
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product }); // destructing
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product]);

  function handleChange(evet) {
    const { name, value } = evet.target;
    setProduct(previousProduct => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value
    }));
    validate(name,value);
  }
function validate(name,value){
  if (name==="productName" && value==="") {
    setErrors(previousErrors => ({
      ...previousErrors,
      productName: "Ürün ismi olmalıdır"
    }));
  }else{
    setErrors(previousErrors=>({
      ...previousErrors,
      productName:""
    }));
  }
}
  function handleSave(event) {
    event.preventDefault(); // sayfanın refresini engeler
    saveProduct(product).then(() => {
      history.push("/");
    });
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find(product => product.id == productId) || null; //product yoksa null atayacak
  return product;
}

function mapSateToProps(state, ownProps) {
  const productId = ownProps.match.params.productId; // string olarak giden bir değer
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct
};

export default connect(mapSateToProps, mapDispatchToProps)(AddOrUpdateProduct);
