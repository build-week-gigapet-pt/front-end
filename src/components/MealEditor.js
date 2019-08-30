import React, { useState } from "react";
import { Card, Select } from "semantic-ui-react";
import { withFormik, Form, Field } from "formik";
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup";
import { axiosWithAuth } from "./axiosAuth";

const MealEditor = ({ childname, childEntries }) => {
  const mealOptions = [];
  const [currMeal, setCurrMeal] = useState();

  childEntries &&
    childEntries.forEach((entry, i) => {
      mealOptions.push({
        key: i,
        value: entry.child_id,
        text: `${entry.meal}, ${entry.date_update.split("T")[0]}`
      });
    });

  const handleChange = (e, { value }) => {
    setCurrMeal(value);
  };

  const UpdateForm = ({
    errors,
    status,
    values,
    currMeal,
    isSubmitting,
    setFieldValue
  }) => {
    const today = new Date();
    return (
      <Form>
        <label htmlFor="name" className="form-name">
          <Field
            type="text"
            name="name"
            placeholder="Soup, Banana, PB&amp;J, etc..."
          />{" "}
        </label>
        <label htmlFor="quantity" className="form-quantity">
          <Field type="text" name="quantity" placeholder="1, 2, 3, etc..." />{" "}
        </label>
        <label htmlFor="meal" className="form-meal">
          <Field
            type="text"
            name="meal"
            placeholder="Breakfast, Snack, etc..."
          />
        </label>
        <label htmlFor="category" className="form-category">
          <Field
            type="text"
            name="category"
            placeholder="Carbs, Fruit, etc..."
          />
        </label>
        <Field type="hidden" name="date_update" value />
        <Field type="hidden" name="id" value={currMeal} />
        <Field
          component="button"
          type="submit"
          name="submitBtn"
          className="submit-edit"
          onClick={() => {
            setFieldValue(
              "date_update",
              `${today.getFullYear()}-${today.getMonth() +
                1}-${today.getDate()}`
            );
            setFieldValue("id", currMeal);
          }}
          disabled={isSubmitting}
        >
          Submit
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

  const FormikForm = withFormik({
    mapPropsToValues({ name, quantity, meal, category, date_update, id }) {
      return {
        name: name || "",
        quantity: quantity || "",
        meal: meal || "",
        category: category || "",
        date_update: date_update || "",
        id: id || ""
      };
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      quantity: Yup.number().required(),
      meal: Yup.string().required(),
      category: Yup.string().required()
    }),
    handleSubmit(values, { resetForm, setErrors, setStatus }) {
      values.id === undefined
        ? setErrors({ email: "Please select a meal to edit." })
        : axiosWithAuth()
            .put(
              `https://lambda-gigapet2.herokuapp.com/api/entries/${values.id}`,
              values
            )
            .then(res => {
              setStatus(res);
              resetForm();
            })
            .catch(err => console.log(err));
    }
  })(UpdateForm);

  return (
    <Card.Content className="meal-editor">
      {" "}
      <h3>Edit {childname}'s Meals:</h3>
      <Select
        placeholder="Select child's meal to edit..."
        options={mealOptions}
        onChange={(e, { value }) => handleChange(e, { value })}
      />
      <FormikForm currMeal={currMeal} />
    </Card.Content>
  );
};

export default MealEditor;
