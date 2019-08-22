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

             </Form>
        </div>
    )

 }

 export default UsersForm; 