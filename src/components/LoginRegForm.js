import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Tab, Container, Header, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import logo from "../imgs/gigapet-logo.png";

const LoginPane = ({ errors, props }) => {
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
  const val = Math.floor(1000 + Math.random() * 9000);

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
  validateOnBlur: false,
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string()
      .min(8)
      .required()
  }),
  handleSubmit(values, { props }) {
    axios
      .post("https://lambda-gigapet2.herokuapp.com/api/auth/login", values)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          props.props.props.history.push("/dashboard");
        }
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
  validateOnChange: false,
  validateOnBlur: false,
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
  handleSubmit(values, { props }) {
    axios
      .post("https://lambda-gigapet2.herokuapp.com/api/auth/register", values)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          props.props.props.history.push("/profile");
        }
      })
      .catch(err => console.log(err));
  }
})(RegisterPane);

const tabs = [
  {
    menuItem: "Login",
    render: props => (
      <Tab.Pane>
        <FormikLogForm props={props} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Register",
    render: props => (
      <Tab.Pane>
        <FormikRegForm props={props} />
      </Tab.Pane>
    )
  }
];

const LoginRegForm = props => {
  return (
    <Container className="main-container">
      <Header>
        <Image className="header-logo" src={logo} alt="GigaPet Logo Small" />
      </Header>
      <Container className="loginreg-form-container">
        <Tab panes={tabs} props={props} />;
      </Container>
    </Container>
  );
};

export default LoginRegForm;
