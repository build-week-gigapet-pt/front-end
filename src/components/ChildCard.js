import React, { useState, useEffect } from "react";
import { Image, Card, Button } from "semantic-ui-react";
import { axiosWithAuth } from "./axiosAuth";
import "semantic-ui-css/semantic.min.css";
import ChildStats from "./ChildStats";
import MealList from "./MealList";
import MealEditor from "./MealEditor";

const ChildCard = props => {
  const [childEntries, setChildEntries] = useState("");
  const [hoursSinceLastMeal, setHoursSinceLastMeal] = useState(0);
  const [lastMeal, setLastMeal] = useState();
  const [petStatus, setPetStatus] = useState("ok");

  useEffect(() => {
    axiosWithAuth()
      .get(
        `https://lambda-gigapet2.herokuapp.com/api/child/${props.child.child_id}/entries`
      )
      .then(res => {
        setChildEntries(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (childEntries.length > 0) {
      const lastDate = new Date(
        Math.max.apply(
          Math,
          childEntries.map(entry => new Date(entry.date_update).getTime())
        )
      );
      const currDate = new Date();
      console.log(lastDate, currDate);
      setLastMeal(childEntries[childEntries.length - 1]);
      setHoursSinceLastMeal(Math.floor((currDate - lastDate) / (1000 * 3600)));
    }
  }, [childEntries]);

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
            <Button>Add Meal +</Button>
          </Card.Content>
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
