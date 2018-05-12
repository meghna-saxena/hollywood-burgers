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

A Fragment does not create additional nodes,  like a  <div> does. 

EXTRA  INFORMATION: 

- <Fragment>  syntax does not accept attributes,  but,  it can have key and children (props). 
- <Fragment>  won’t add an actual element to the DOM. 
- <></> in not guaranteed to work. <Fragment> is currently dependable. 