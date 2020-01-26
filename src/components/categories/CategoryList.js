import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";
import { ListGroup, ListGroupItem,Badge } from "reactstrap";
class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = category => {//(category) :: tek paratre olunca parantezz yazılmayabilir.
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id)
  };

  render() {
    return (
      <div>
        {/* <h3>Categories {this.props.categories.length}</h3> */}
        <h3>
            
          <Badge color="warning">
          Products
          </Badge>
        </h3>
        <ListGroup>
          {this.props.categories.map(category => (
            // active={true} veya active
            <ListGroupItem
              active={category.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* <h5>Seçili Kategori:{this.props.currentCategory.categoryName}</h5> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts:bindActionCreators(
        productActions.getProducts,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
