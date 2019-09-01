import React from "react";
import { axiosWithAuth } from "./axiosAuth";
import { Card, Icon } from "semantic-ui-react";
import { withFormik, Form, Field } from "formik";
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup";

const FormikMealAdd = ({ show, childEntries, childID }) => {
  const MealForm = ({ errors, childID, setFieldValue }) => {
    const today = new Date();
    const handleClick = () => {
      setFieldValue("childID", childID);
      setFieldValue("date_added", today);
      setFieldValue("date_update", today);
    };

    return (
      <Card.Content className="add-meal-container" style={{ display: show[0] }}>
        <Icon name="close" onClick={() => show[1]("none")} />
        <h3>Add A Meal</h3>
        <Form>
          <Field name="meal" component="select">
            <option value>Select Meal...</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </Field>
          <Field type="text" name="name" placeholder="Food: Soup, Apple..." />
          <Field type="text" name="quantity" placeholder="Qty.: 1, 2, 3..." />
          <Field type="text" name="category" placeholder="Category: Carbs..." />
          <Field type="hidden" name="childID" value />
          <Field type="hidden" name="date_added" value />
          <Field type="hidden" name="date_update" value />

          <Field
            component="button"
            type="submit"
            name="addMealBtn"
            onClick={() => handleClick()}
          >
            Add Meal +
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
      </Card.Content>
    );
  };

  const FormikForm = withFormik({
    mapPropsToValues({
      meal,
      name,
      quantity,
      category,
      childID,
      date_added,
      date_update
    }) {
      return {
        name: name || "",
        quantity: quantity || "",
        meal: meal || "",
        category: category || "",
        childID: childID || "",
        date_added: date_added || "",
        date_update: date_update || ""
      };
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Enter food name..."),
      quantity: Yup.number("Must be a number.").required("Enter quantity..."),
      meal: Yup.string().required("Please select meal..."),
      category: Yup.string().required("Please enter category...")
    }),
    handleSubmit(values, { resetForm, setErrors, setStatus }) {
      axiosWithAuth()
        .post(
          `https://lambda-gigapet2.herokuapp.com/api/child/${values.childID}/entries`,
          {
            name: values.name,
            quantity: values.quantity,
            meal: values.meal,
            category: values.category,
            date_added: values.date_added,
            date_update: values.date_update
          }
        )
        .then(res => {
          setStatus(res.data);
          axiosWithAuth()
            .get(
              `https://lambda-gigapet2.herokuapp.com/api/child/${values.childID}/entries`
            )
            .then(res => childEntries[1](res.data));
          resetForm();
        })
        .catch(err => console.log(err));
    }
  })(MealForm);

  return <FormikForm />;
};

export default FormikMealAdd;
