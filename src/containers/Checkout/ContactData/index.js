import React, { Component } from 'react';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';
import FormInput from '../../../components/UI/FormInput';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementtype: 'input',
                elementconfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementtype: 'select',
                elementconfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            },
        },
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <FormInput
                        key={formElement.id}
                        elementtype={formElement.config.elementtype}
                        elementconfig={formElement.config.elementconfig}
                        value={formElement.config.value} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;