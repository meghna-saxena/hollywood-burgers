import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            // console.log('[new array]', [...Array(props.ingredients[igKey])]);
            // console.log('igkey', igKey);
            // console.log('value of i' + i);
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    })

    //Flatten the array
    .reduce((arr, el) => {
        // return arr.concat(el)
        return [...arr, ...el]
    }, []);

    console.log('transformedIngredients', transformedIngredients); 
    //Earlier: [Array(1), Array(1), Array(2), Array(2)] && now: transformedIngredients []

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    // ===================================================================
    // Another approach to convert object into an array
    // ===================================================================

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

    // console.log('transformedIngredients', transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;