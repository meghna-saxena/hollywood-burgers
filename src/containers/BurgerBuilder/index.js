import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // console.log(this.props);
        // axios.get('https://make-my-burger.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     })
    }


    //Order button
    updatePurchaseState(ingredients) {
        // const ingredients = { ...this.state.ingredients };
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
            .reduce((left, right) => {
                return left + right
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    //it will be triggered when order btn is clicked
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = { ...this.props.ings }; 

        for (let type in disabledInfo) {
            disabledInfo[type] = disabledInfo[type] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.props.price}
                        ordered={this.purchaseHandler} />
                </Fragment>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));