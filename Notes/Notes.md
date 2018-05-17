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


## Tried another way to set my initial state

```
const ingredients = [
  {type: "cheese", count: 2},
  {type: "bacon", count: 3}
  ];

ingredients.map(ig => {
  let igCount = ig["count"]
  
  const transformedIngredients = [...Array(igCount)];
  console.log(transformedIngredients);
  
  transformedIngredients.map(x => {
  console.log(ig.type);
  return ig.type
})
})
```

> Console
[undefined, undefined]
"cheese"
"cheese"
[undefined, undefined, undefined]
"bacon"
"bacon"
"bacon"



## Build Controls
- Build Controls component contains controls array which has many labels, it loops over it and pass it to BuildControl component

- Build Control component has label and 2 buttons


## Connecting state to build controls

### Adding ingredients 
- Made addIngredientHandler = (type) => {...}
updating price and ingredients depending on the types passed 

```
addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
    }
```

Passing the reference to this handler across build controls where (type) is send as a param of the funct. It will no be executed immediately since its wrapped with a anony callback func.

```
  <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)} />
```


### Removing ingredients
- Make removehandler where you update the price and ingredients.

- Make a base condition that if ingredient[type] <=0 return or if ingredient[type]>0 then execute the rest of the operation.

- Also, we can disbale the button by doing a for..in loop, getting keys/type of ingredient obj and checking if they are <= 0, then disabled them. Button has the css properties.


## Display price above controls
- pass the totalPrice set in state to the controls comp
- fixed the value by tofixed(2) method

## Added order button
Made a `purchasable` property in state with initial state value false. Set state to true whenever some item is added. Therefore made a handler where total ingredients are added to get the sum. And if sum>0, set purchasable state to true.


## Order summary modal
- Made new property `purchasing` in state and set it to false
- Made an onclick event on the order btn. 
- Whenever the btn is clicked it will execute a function where `purchasing` will be set to true
- Pass this `purchasing` property as `show` attribute in modal
- Put the conditions of css depending on the true or false value 


## Implementing the backdrop component
Added styling


## Added custom button to continue or cancel in the order summary

## Adding toolbar and sidedrawer
- Need for navigating to other pages
- Sidedrawer for mobile layouts


Note: Flexbox is great for one-dimensional layouts - a navbar for example (which is only horizontal). CSS grid is great for two-dimensional layouts.

Sometimes you need both, sometimes flexbox (or CSS grid) alone is enough. One thing to keep in mind is that CSS grid is a bit worse supported right now though.

- Adding reusable navigation items in toolbar since they will be used again in side-drawer.

- Responsive sidedrawer
- consists of sidedrawer itself and a toggle button, and a backdrop



# Firebase
- Implementing backend server to store orders and retrieve them
- Firebase made by Google is a working backend with database
- Firebase does the mapping of API endpoints and database
- We just have to send the data to endpoints and it gets stored in database


# Added axios 
Different ways of including axios in project:
- Creating an instance of axios
- Importing globally and setting some defaults

- Here, created instance of axios, since we won't be using baseURL as global default. We'll be using diff url for authorization

## Storing data
- Make axios.post() request inside burgerbuilder.js, there is purchaseContinueHandler(), where we manage the checkout button
- Take the order and store it with some dummy data appended to it to the database
- `axios.post('/orders.json')` //for firebase exclusively we use this pattern for url where baseurl/any node name + .json, it is the endpoint to be targetted
- Now we also need to send some data

Note: 
- For practice purpose we're getting total price and ingredients locally, but in real app calculate the total price on the backend server bcause you would have all your products stored there, to avoid user manipulating the data

- Since we're not having a checkout form, we're making some dummy customer data to be stored on database

```
purchaseContinueHandler = () => {
        // alert('Work in progress..');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Meggie Saxena',
                address: {
                    street: 'TestStreet 1',
                    zipCode: '42944',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
```

- Inside firebase, the data gets stored - we see the orders node name - inside which there is encrypted name. Firebase automatically creates a list under the node and each list item has unique name/id


## Displaying a spinner while sending a request
- Show something to user when the req is on its way
- - A spinner inside the modal, instead of order summary user sees a spinner there, and once the req resolves the modal gets closed.

- Add a spinner component inide UI components
- Added css spinner code
- Inside burgerbuilder.js, added new state property loading: false and change it conditionally when user continues purchase.
- Inside modal, we keep a check that show either spinner or order summary depending on the case.