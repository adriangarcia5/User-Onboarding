import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UsersForm = (props) => {
    const [users, setUsers] = useState([])

    return (
        <div className='userForm'>
            <h1> Registration</h1>
            <p>Please use the following form to register</p>
            <Form>
                <Field type='text' name='name' placeholder="Please enter your name" />
                <Field type='email' name='email' placeholder='Email' />
                <Field type='password' name='password' placeholder='password'  />
                <label>
                    <Field
                        type='checkbox'
                        name='termsOfService'
                        value='checked'
                     />
                     I have read and agree with the <a href="#">Terms of Service</a>
                </label>
            </Form>
        </div>
    )

}

//Higher Order Component - HOC
const FormikUsersForm = withFormik({
    mapPropsToValues({ name }) {
        return {
            name: name || ''
        };
    },

    validationSchema: Yup.object().shape({
    }),

    handleSubmit(values, {resetForm}) {
        console.log('Form submitted', values);      
    }
})(UsersForm);

export default FormikUsersForm;