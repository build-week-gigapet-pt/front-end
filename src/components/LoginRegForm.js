import React, { useEffect, useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Tab } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const LoginPane = ({ errors, status }) => {
  const [loggedState, setLoggedState] = useState();

  useEffect(() => {
    status && errors.length === 0
      ? setLoggedState(true)
      : setLoggedState(false);
  }, [status, loggedState, errors]);

  return (
    <Form>
      <Field type="text" name="username" placeholder="Username" />
      <Field type="password" name="password" placeholder="Password" />
      <Field
        className="submitBtn"
        component="button"
        type="submit"
        name="loginSubmit"
      >
        SUBMIT
      </Field>
      {errors && Object.keys(errors).length > 0 && (
        <div className="errors">
          <ul>
            {Object.values(errors).map((error, i) => {
              return <li key={i}>{error}</li>;
            })}
          </ul>
        </div>
      )}
    </Form>
  );
};

const RegisterPane = ({ errors, status, setFieldValue }) => {
  const [regState, setRegState] = useState();
  const val = Math.floor(1000 + Math.random() * 9000);

  useEffect(() => {
    status && errors.length === 0 ? setRegState(true) : setRegState(false);
  }, [regState, errors, status]);
  return (
    <Form>
      <Field type="text" name="firstname" placeholder="First Name" />
      <Field type="text" name="lastname" placeholder="Last Name" />
      <Field type="text" name="username" placeholder="Username" />
      <Field type="password" name="password" placeholder="Password" />
      <Field type="hidden" name="pin" value />
      <Field
        className="submitBtn"
        component="button"
        type="submit"
        name="regSubmit"
        onClick={() => setFieldValue("pin", val)}
      >
        SUBMIT
      </Field>
      {errors && Object.keys(errors).length > 0 && (
        <div className="errors">
          <ul>
            {Object.values(errors).map((error, i) => {
              return <li key={i}>{error}</li>;
            })}
          </ul>
        </div>
      )}
    </Form>
  );
};

const FormikLogForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },
  validateOnChange: false,
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string()
      .min(8)
      .required()
  }),
  handleSubmit(values, { resetForm, setErrors, setStatus }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log(res);
        resetForm();
      })
      .catch(err => console.log(err));
  }
})(LoginPane);

const FormikRegForm = withFormik({
  mapPropsToValues({ firstname, lastname, username, password, pin }) {
    return {
      firstname: firstname || "",
      lastname: lastname || "",
      username: username || "",
      password: password || "",
      pin: pin || ""
    };
  },
  validationSchema: Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    username: Yup.string()
      .min(8)
      .required(),
    password: Yup.string()
      .min(8)
      .required()
  }),
  handleSubmit(values, { resetForm, setErrors, setStatus }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log(res);
        resetForm();
      })
      .catch(err => console.log(err));
  }
})(RegisterPane);

const tabs = [
  {
    menuItem: "Login",
    render: () => (
      <Tab.Pane>
        <FormikLogForm />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Register",
    render: () => (
      <Tab.Pane>
        <FormikRegForm />
      </Tab.Pane>
    )
  }
];

const LoginRegForm = () => <Tab panes={tabs} />;

export default LoginRegForm;
