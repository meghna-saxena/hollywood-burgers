## Props.children ES6 syntax

React can tell the difference between JSX & JavaScript by the sequential order of the code parts. 

(<div>{props.children}</div>) React thinks,  DOM elements enclosing curly braces = JSX. The parenthesis are optional (here) so they're not really considered. 

({props.children}) React thinks,  No DOM elements, just curly braces = a JavaScript object literal.   BUT props.children is invalid object literal code,  so,  throw an error. 

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Slightly Off topic example: const MyComponent = myValue => ({myProperty: myValue}); 

Above:  The parenthesis are necessary,  or else, React thinks the curly braces are this method's enclosing curly braces, not the object literal's curly braces. So,  an error is thrown.   

------------------------------------------------------------------------------------------------

You can replace each of the following code lines with the MyHOC component in my (below) script. 

const MyHOC = props => (<div>{props.children}</div>); // Works 

const MyHOC = props => <div>{props.children}</div>; // Works 

const MyHOC = props => props.children; // Works 

const MyHOC = props => { return props.children; }; // Works 

const MyHOC = props => {props.children}; // Error 

const MyHOC = props => ({props.children}); // Error 

=============================================================================================== 

> Index.js     This file does not require any other files inside the src folder. 

```
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
const MyChild = props => <div>Hello</div>;
const MyHOC = props => {
    const myHocStyle={color:'#c00', fontWeight:'bold', fontSize:'24px'};
    return <div style={myHocStyle}>{props.children}</div>;
};
class MyParent extends Component {
    render() {
        const myContainer={maxWidth:'280px', margin:'10px auto', padding:'4px 0',
                backgroundColor:'#ddd', textAlign:'center', border:'1px solid #000'};
        return (
            <div style={myContainer}>
                <MyHOC><MyChild /></MyHOC>
            </div>
        );
    }
}
ReactDOM.render(<MyParent />, document.getElementById('root'));
```


## Fragment
Wrapping your multiple DOM elements inside a single returned  <Fragment> Component is more efficient than wrapping your multiple elements inside a single returned  <div> Component. 

A Fragment does not create additional nodes, like a <div> does. 

The idea behind HOC/Aux is to circumvent the restriction of JSX to not have sibling elements on a root level. You could use a <div> but the advantage of <Aux> is that it doesn't render an unnecessary element.

EXTRA  INFORMATION: 

- <Fragment>  syntax does not accept attributes,  but,  it can have key and children (props). 
- <Fragment>  won’t add an actual element to the DOM. 
- <></> in not guaranteed to work. <Fragment> is currently dependable. 


## Layout Component, we're using in project
Layout just as a higher order component that can be wrapped around whatever should go into that layout. Hence, placing the BurgerBuilder inside <Layout> in the App.js file.

This will wrap it with the layout and still lay out the app structure in the main app file.


## Proptypes
- Proptypes can be used in class component, so refactor function BurgerIngredient comp to class comp. However, since it doesnt handles state, so it's still considered a dumb component.


However conversion from functional to classical components is not required to use propTypes

Classes are just constructor functions under the hood and constructor functions are just functions and functions are objects in JavaScript.

```
burgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}
```

Adding propTypes to burgerIngredient as a property is totally valid regardless if burgerIngredient is a functional or a classical component. 


> propType suggestion

Instead of typing this prop as string, we can directly check what's value this props can be

```
 type: PropTypes.oneOf([
      "bread-bottom",
      "bread-top",
      "meat",
      "cheese",
      "salad",
      "bacon"
    ]).isRequired
```

Note: Media queries are used so that burger looks good in all view ports.


## Converting object into array

> BurgerBuilder.js
- Since ingredients is an object and we cant map over it to pass each element into BurgerIngredients.js, we've to convert object into array!

```
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    };
...

```

- Get an array of keys, by  Object.keys(props.ingredients);

> Burger.js

Step-by-step
```
const transformedIngredients = Object.keys(props.ingredients);
    console.log('transformedIngredients', transformedIngredients);
    //["salad", "bacon", "cheese", "meat"]
```

- Map over the array containing keys and return a new array with size of Array(props.ingredients[igKey]), since the size will be 4, but the values will be undefined, spread over it!
```
const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])]
    })
    console.log('transformedIngredients', transformedIngredients);
    //[Array(1), Array(1), Array(2), Array(2)]

```
- Finally return the elements one by one to burgeringredient component

```
const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        })
    })

    console.log('transformedIngredients', transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}
```

Summary:
First, the Object.keys(props.ingredients) returns an array containing the keys, i.e., the ingredient names. Using the map function on this array, we construct a new array using the Array() function by passing the number of times each ingredient must be added, (which is the value in the original ingredients object passed as props) as the value. Then for each array of specific ingredients, we return the JSX containing the BurgerIngredient component.

In short, we are extracting the keys of the ingredients into an array, then for each ingredient in that array, we are creating a new array with that ingredient present as many times as specified in the value, then for each element of that array (the second one), we are generating JSX.



Another approach:

```
 let transformedIngredients = [];

    Object.keys(props.ingredients).map(igKey => {
        let count = props.ingredients[igKey];

        for (let i = 0; i < count; i++) {
            transformedIngredients.push(igKey);
        }
    })

    transformedIngredients = transformedIngredients.map((igKey, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />
    });

    console.log('transformedIngredients', transformedIngredients);
    // [{…}, {…}, {…}, {…}, {…}, {…}]

```

## Flatten the array

 //Earlier: [Array(1), Array(1), Array(2), Array(2)] && now: transformedIngredients []

- The reduce() method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.

Flatten an array of arrays
```
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  function(accumulator, currentValue) {
    return accumulator.concat(currentValue);
  },
  []
);
// flattened is [0, 1, 2, 3, 4, 5]
Alternatively, written with an arrow function:

var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  ( accumulator, currentValue ) => accumulator.concat(currentValue),
  []
);

```


Apply the same logic on the burger component

```
let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            // console.log('[new array]', [...Array(props.ingredients[igKey])]);
            // console.log('igkey', igKey);
            // console.log('value of i' + i);
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    })

    .reduce((arr, el) => {
        return arr.concat(el) // return [...arr, ...el]
    }, []);
```