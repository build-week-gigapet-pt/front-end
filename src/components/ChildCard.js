import React, { useState, useEffect } from "react";
import { Image, Card, Button } from "semantic-ui-react";
import { axiosWithAuth } from "./axiosAuth";
import "semantic-ui-css/semantic.min.css";
import ChildStats from "./ChildStats";
import MealList from "./MealList";
import MealEditor from "./MealEditor";
import FormikMealAdd from "./FormikMealAdd";

const ChildCard = props => {
  const childEntries = useState("");
  const [hoursSinceLastMeal, setHoursSinceLastMeal] = useState(0);
  const [lastMeal, setLastMeal] = useState();
  const [petStatus, setPetStatus] = useState("ok");
  const show = useState("none");

  useEffect(() => {
    axiosWithAuth()
      .get(
        `https://lambda-gigapet2.herokuapp.com/api/child/${props.child.child_id}/entries`
      )
      .then(res => {
        childEntries[1](res.data);
      })
      .catch(err => console.log(err));
  }, [props.child.child_id]);

  useEffect(() => {
    if (childEntries[0].length > 0) {
      const lastDate = new Date(
        Math.max.apply(
          Math,
          childEntries[0].map(entry => new Date(entry.date_update).getTime())
        )
      );
      const currDate = new Date();

      childEntries[0].map(entry => {
        if (new Date(entry.date_update).getTime() === lastDate.getTime())
          setLastMeal(entry);
      });

      setHoursSinceLastMeal(Math.floor((currDate - lastDate) / (1000 * 3600)));
    }
  }, [childEntries[0]]);

  useEffect(() => {
    props && hoursSinceLastMeal >= 72
      ? setPetStatus("sick")
      : hoursSinceLastMeal >= 24 && hoursSinceLastMeal <= 71
      ? setPetStatus("sad")
      : hoursSinceLastMeal >= 12 && hoursSinceLastMeal <= 23
      ? setPetStatus("ok")
      : setPetStatus("happy");
  }, [hoursSinceLastMeal]);

  return (
    <Card className="childcard">
      <Card.Content className="outer-content">
        <Card.Header>{props.child.child_name}</Card.Header>
        <Card.Content className="inner-content">
          <Card.Content className="pet-info">
            <Image
              className="childcard-pet-image"
              src={`${props.child[petStatus]}`}
            ></Image>
            <Card.Meta>
              {props.child.pet_name}, XP: {props.child.pet_experience}
            </Card.Meta>{" "}
            <Button onClick={() => show[1]("flex")}>Add Meal +</Button>
          </Card.Content>

          <FormikMealAdd
            childID={props.child.child_id}
            show={show}
            childEntries={childEntries}
          />

          <ChildStats
            lastMeal={lastMeal}
            hoursSinceLastMeal={hoursSinceLastMeal}
            petStatus={petStatus}
          />
          {lastMeal !== undefined && <MealList childEntries={childEntries} />}
          {lastMeal !== undefined && (
            <MealEditor
              childname={props.child.child_name}
              childEntries={childEntries}
            />
          )}
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default ChildCard;
