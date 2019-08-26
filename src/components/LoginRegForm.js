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
    console.log(loggedState);
  }, [status, loggedState, errors]);

  return (
    <Form>
      <Field type="text" name="username" placeholder="Username" />
      <Field type="password" name="password" placeholder="Password" />
      <Field component="button" type="submit" name="submitBtn">
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

const RegisterPane = ({ errors, status }) => {};

const FormikLogForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string()
      .min(8)
      .required()
  }),
  handleSubmit(values, { resetForm, setErrors, setStatus }) {
    values.email === "waffle@syrup.com"
      ? setErrors({ email: "That email is already taken" })
      : axios
          .post("https://reqres.in/api/users", values)
          .then(res => {
            // console.log(res);
            console.log(values);
            setStatus(res.data);
            resetForm();
          })
          .catch(err => console.log(err));
  }
})(LoginPane);

const tabs = [
  {
    menuItem: "Login",
    render: () => (
      <Tab.Pane>
        <FormikLogForm />
      </Tab.Pane>
    )
  },
  { menuItem: "Register", render: () => <Tab.Pane>Register Content</Tab.Pane> }
];

const LoginRegForm = () => <Tab panes={tabs} />;

export default LoginRegForm;
