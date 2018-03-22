import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button
        //array of string of classes
        className={[classes.Button, classes[props.btnType]].join('')}
        onClick={props.clicked}>{props.children}</button>

        // can also use Button classes with ES6 template strings
        // className={`${classes.Button} ${classes[props.btnType]}`} 
);

export default button;