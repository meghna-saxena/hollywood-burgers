import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            // console.log('[new array]', [...Array(props.ingredients[igKey])]);
            // console.log('igkey', igKey);
            // console.log('value of i' + i);
            return <BurgerIngredient key={igKey + i} type={igKey} />
        })
    });

    console.log('transformedIngredients', transformedIngredients); //[Array(1), Array(1), Array(2), Array(2)]

    // let transformedIngredients = [];

    // Object.keys(props.ingredients).map(igKey => {
    //     let count = props.ingredients[igKey];

    //     for (let i = 0; i < count; i++) {
    //         transformedIngredients.push(igKey);
    //     }
    // })

    // transformedIngredients = transformedIngredients.map((igKey, i) => {
    //     return <BurgerIngredient key={igKey + i} type={igKey} />
    // });

    console.log('transformedIngredients', transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;