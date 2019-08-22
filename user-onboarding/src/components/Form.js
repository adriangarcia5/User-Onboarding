import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UsersForm = (props) => {
    const [users, setUsers] = useState([])

    return (
        <div className='userForm-container'>
            <h1> Registration</h1>
            <p>Please use the following form to register</p>
            <Form className="userForm">
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
                <button type='submit'>Submit</button>
            </Form>
        </div>
    )

}

//Higher Order Component - HOC
const FormikUsersForm = withFormik({
    mapPropsToValues({ name, email, password, termsOfService }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            termsOfService: termsOfService || false
        };
    },

    validationSchema: Yup.object().shape({
    }),

    handleSubmit(values, {resetForm}) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log('Form was a success', res)
                resetForm();
            })
            .catch(err => console.log('Opps! Something went wrong.',err.response));
    }
})(UsersForm);

export default FormikUsersForm;