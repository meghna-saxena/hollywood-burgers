## Getting started
- Install redux and react-redux
- Access redux store in the application
- Containers contains state which can be managed by redux
- No need to refactor UI state managed by containers/components, only manage state which is used globally.

- Made 2 actions - add ingredient and remove ingredient
- Handling 2 state properties from burgerbuilder.js
`ingredients and totalPrice`

### Inside index.js, set up the redux environment
If you're creating a SPA, you'll probably have one main page you render. In there, wrap the main React component with <Provider> just as shown in this course.

```
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';

const store = createStore(reducer);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
```


### Created reducer
- Reducer is a function taking state and action
- make switch statement for actionType
- for different action case, return the reqd. 

```
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            };
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            };
        default:
            return state;
    }
};

```

used [action.ingredientName]  because we’re dynamically accessing the property, i.e. we don’t previously know which property we have to access (salad? bacon? cheese? meat?). ingredientName is a parameter that will have to be passed when we dispatch these action:

```
dispatch({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: 'meat'
})
```

### Connecting burger builder container to store
```

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}), //pasing payload along with action.type
        
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    };
}
```


### mapDispatchToProps or dispatch in component itself

You don't have to use mapDispatchToProps - but it's the recommend way since it provides and easy-to-understand, predictable way of dispatching actions. It's a good pattern and practice to use the connect() HOC and bind all the data/ actions you get from Redux to normal component props.


### Total price calculation
- Price changes whenever ingredient is added or removed
- 2 approach  
- - Either define new action type for price change and handle the state in reducer
- - Or update price in the exisiting action types itself

```
switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
```