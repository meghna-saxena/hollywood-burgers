import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 2,
            meat: 2
        }
    };

    render() {
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls />
            </Fragment>
        );
    }
}

export default BurgerBuilder;