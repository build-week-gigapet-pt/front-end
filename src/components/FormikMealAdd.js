import React from "react";
import { axiosWithAuth } from "./axiosAuth";
import { Card } from "semantic-ui-react";
import { withFormik, Form, Field } from "formik";
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup";

const FormikMealAdd = ({ childID }) => {
  const MealForm = ({ errors, childID, isSubmitting, setFieldValue }) => {
    return (
      <Card.Content className="add-meal-container">
        <h3>Add A Meal</h3>
        <Form>
          <Field name="mealtype" component="select">
            <option value>Select a Meal Type...</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </Field>
          <Field
            type="text"
            name="foodeaten"
            placeholder="Enter food eaten..."
          />
          <Field type="text" name="quantity" placeholder="Enter quantity..." />
          <Field type="text" name="category" placeholder="Enter category..." />
          <Field component="button">Add Meal +</Field>
        </Form>
      </Card.Content>
    );
  };

  const FormikForm = withFormik({})(MealForm);

  return <FormikForm />;
};

export default FormikMealAdd;
