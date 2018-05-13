import React, { Component, Fragment} from 'react';
import Burger from '../../components/Burger';

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
                <div>Build Controls</div>
            </Fragment>
        );
    }
}

export default BurgerBuilder;