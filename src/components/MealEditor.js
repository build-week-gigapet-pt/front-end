import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import { withFormik, Form, Field } from "formik";
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup";
import { axiosWithAuth } from "./axiosAuth";
import moment from "moment";

const MealEditor = ({ childname, childEntries }) => {
  const mealOptions = [];
  const [currMeal, setCurrMeal] = useState();
  const [childID, setChildID] = useState();

  childEntries &&
    childEntries.forEach((entry, i) => {
      let dateparts = String(moment(entry.date_update)._d)
        .split(" ")
        .slice(0, 4);
      dateparts = `${dateparts[0]}. ${dateparts[1]} ${dateparts[2]}, ${
        dateparts[3]
      }`;
      mealOptions.push({
        key: i,
        value: entry.id,
        text: `${entry.meal}, ${dateparts}`
      });
    });

  const handleChange = (e, value) => {
    setCurrMeal(value);
    setChildID(childEntries[0].child_id);
  };

  const UpdateForm = ({ errors, currMeal, isSubmitting, setFieldValue }) => {
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
        <Field type="hidden" name="datakey" value />
        <Field
          component="button"
          type="submit"
          name="submitBtn"
          className="submit-edit"
          onClick={() => {
            setFieldValue("date_update", today);
            setFieldValue("id", currMeal);
            setFieldValue("datakey", childID);
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
    mapPropsToValues({
      name,
      quantity,
      meal,
      category,
      date_update,
      id,
      datakey
    }) {
      return {
        name: name || "",
        quantity: quantity || "",
        meal: meal || "",
        category: category || "",
        date_update: date_update || "",
        id: id || "",
        datakey: datakey || ""
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
      console.log(values);
      values.datakey === undefined
        ? setErrors({ email: "Please select a meal to edit." })
        : axiosWithAuth()
            .put(
              `https://lambda-gigapet2.herokuapp.com/api/entries/${values.datakey}`,
              {
                name: values.name,
                quantity: values.quantity,
                meal: values.meal,
                category: values.category,
                date_update: values.date_update
              }
            )
            .then(res => {
              setStatus(res.data);
              resetForm();
            })
            .catch(err => console.log(err));
    }
  })(UpdateForm);

  return (
    mealOptions && (
      <Card.Content className="meal-editor">
        {" "}
        <h3>Edit {childname}'s Meals:</h3>
        <select
          className="styled-select"
          onChange={(e, value, datakey) => handleChange(e, value, datakey)}
        >
          <option key={0} value="">
            Select child's meal to edit...
          </option>
          {mealOptions.map(option => {
            return (
              <option
                key={option.key + 1}
                value={option.value}
                datakey={option.child_id}
              >
                {option.text}
              </option>
            );
          })}
        </select>
        <FormikForm currMeal={currMeal} />
      </Card.Content>
    )
  );
};

export default MealEditor;
