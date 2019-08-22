import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UsersForm = ({ errors, touched, values, status }) => {

    const [users, setUsers] = useState([]);
    console.log(users)

    useEffect(() => {
        if(status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return (
        <div className='userForm-container'>
            <h1> User Sign in</h1>
            <p>Please use the following form to sign in.</p>
            <Form className="userForm">
                <Field type='text' name='name' placeholder="Please enter your name" />
                {touched.name && errors.name && (
                    <p className='errors'>{errors.name}</p>
                )}

                <Field type='email' name='email' placeholder='Email' />
                {touched.email && errors.email && (
                    <p className='errors'>{errors.email}</p>
                )}

                <Field type='password' name='password' placeholder='password'  />
                {touched.password && errors.password && (
                    <p className='errors'>{errors.password}</p>
                )}

                <label>
                    <Field
                        type='checkbox'
                        name='termsOfService'
                        value='checked'
                     />
                     I have read and agree with the <a href="#">Terms of Service</a>
                </label>
                {touched.termsOfService && errors.termsOfService && (
                    <p className='errors'>{errors.termsOfService}</p>
                )}

                <button type='submit'>Submit</button>
            </Form>

            <div className="userList">
                {users.map(user => (
                    <p key={user.id} className="printedUsers">{user.name}</p>
                ))}
            </div>
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
        name: Yup.string()
                 .required("Name is required"),

        email: Yup.string()
                  .email('Email not valid')
                  .required('Email is required'),

        password: Yup.string()
                     .min(6, 'Password must be 6 characters or longer')
                     .required('Password is required'),

        termsOfService: Yup.bool()
                           .oneOf([true], 'Field must be checked')
    }),

    handleSubmit(values, {resetForm, setStatus}) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log('Form was a success', res)
                resetForm();
                setStatus(res.data)
            })
            .catch(err => console.log('Opps! Something went wrong.',err.response));
    }
})(UsersForm);

export default FormikUsersForm;