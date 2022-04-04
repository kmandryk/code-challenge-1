import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';
import PropTypes from 'prop-types';

Input.propTypes = {
    initialValue: PropTypes.string.isRequired,
    initialValid: PropTypes.string,
    id: PropTypes.string.isRequired,
    onInput: PropTypes.func.isRequired,
    validators: PropTypes.array,
    options: PropTypes.array,
    type: PropTypes.string,
    errorText: PropTypes.string,
    rows: PropTypes.number,
    element: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string
}

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            };
        }
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };
    function createSelectItems() {
        let items = [];
        for (let i = 0; i < props.options.length; i++) {
            let item = props.options[i];
            items.push(<option key={item.label} value={item.value}>{item.label}</option>);
        }
        return items;
    };

    const element = (() => {

        switch (props.element) {
            case 'input':
                return (
                    <input
                        id={props.id}
                        type={props.type}
                        placeholder={props.placeholder}
                        onChange={changeHandler}
                        onBlur={touchHandler}
                        value={inputState.value}
                    />
                );
            case 'textarea': return (
                <textarea
                    id={props.id}
                    rows={props.rows || 3}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                />
            );
            case 'select': return (
                <select
                    id={props.id}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                >
                    <option value=""></option>
                    {createSelectItems()}
                </select>);
        }
    })();

    return (
        <div
            className={`form-control ${!inputState.isValid &&
                inputState.isTouched &&
                'form-control--invalid'}`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;
