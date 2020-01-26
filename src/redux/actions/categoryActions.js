import * as actionTypes from "./actionTypes";

export function changeCategory(category) {
  return {
    type: actionTypes.CHANGE_CATEGORY,
    payload: category
  };
}

export function getCategoriesSuccess(categories) {
  return { type: actionTypes.GET_CATEGORIES_SUCCESS, 
            payload: categories };
}

export function getCategories() {
  //drow back: asenkron redux yan etkiler. redux thunk ile giderilir.
  //apiye bağlanmaa gibi asenkron operasyonlarda redux-thunk
  return function(dispatch) {
    // debugger; //debug işlemi içiin
    let url = "http://localhost:3000/categories";
    return fetch(url)
      .then(response => response.json()) //response herzaman string
      .then(result => dispatch(getCategoriesSuccess(result))); //dispatch:yakalamak, ele geçirmek
  };
}
