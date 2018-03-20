import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

/*
{
    salad: 3,
    bacon: 3,
    cheese: 2,
    meat: 1
}
*/
const burger = (props) => {
    debugger;
    const allIngredients = Object.keys(props.ingredients) // Items
        .map(igKey => {
            const itemCount = props.ingredients[igKey]; //igValue
            return [...Array(itemCount)] // Array of undefineds of size = itemCount
                        .map((_, i) => {;
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        // [ Salad[3], bacon[1], cheese[2], meat[3] ]

        // .reduce((arr, el) => {
        //     return arr.concat(el)
        // }, []);
    const reducerfunction = (arr, el) => {
            //flattens the array
            return [...arr, ...el];// ES5 version is arr.concat(el);
       }

    let transformedIngredients = allIngredients.reduce(reducerfunction, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div >
    );
};

export default burger;