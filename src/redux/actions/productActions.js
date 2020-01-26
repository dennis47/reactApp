import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(product) {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    payload: product
  };
}

export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function saveProductApi(product) {
  return fetch("http://localhost:3000/products/" + (product.id || ""), {
    method: product.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product) //BODY:gönderilecek değer put veya post için,
    // stringify: stringleşttirmek: requestler string formatadır.
  })
    .then(handleResponse) //intentional programing:bir şeyi yazacağını niyetlenmek
    .catch(handleError); //handleError : hatayı nasıl elealacağını söylemektedir.
}

export function saveProduct(product) {
  return function(dispatch) {
    // actionun devreye girmesi için
    return saveProductApi(product)
      .then(savedProduct => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch(error => {
        throw error;
      });
  };
}
export async function handleResponse(response){
  if(response.ok){
    return response.json();

    const error =await response.text();
    throw new Error(error)
  }
}
export function handleError(error){
  console.log("bir hata oluştu")
  throw error
}

export function getProducts(categoryId) {
  //drow back: asenkron redux yan etkiler. redux thunk ile giderilir.
  //apiye bağlanmaa gibi asenkron operasyonlarda redux-thunk
  return function(dispatch) {
    // debugger; //debug işlemi içiin
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url = url + "?categoryId=" + categoryId;
    }
    return fetch(url)
      .then(response => response.json()) //response herzaman string
      .then(result => dispatch(getProductsSuccess(result))); //dispatch:yakalamak, ele geçirmek
  };
}
