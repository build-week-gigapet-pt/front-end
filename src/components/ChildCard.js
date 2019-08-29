import React, { useState, useEffect } from "react";
import { Icon, Image, Card } from "semantic-ui-react";
import { axiosWithAuth } from "./axiosAuth";
import "semantic-ui-css/semantic.min.css";

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
      .then(childEntries && console.log(childEntries[0]))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (childEntries.length > 0) {
      const lastDate = new Date(
        childEntries[childEntries.length - 1].date_added.split("T")[0]
      );
      const currDate = new Date();

      setLastMeal(childEntries[childEntries.length - 1]);
      setHoursSinceLastMeal(Math.floor((currDate - lastDate) / (1000 * 3600)));
    }
  }, [childEntries]);

  useEffect(() => {
    props && hoursSinceLastMeal >= 24
      ? setPetStatus("sick")
      : hoursSinceLastMeal >= 12 && hoursSinceLastMeal <= 23
      ? setPetStatus("sad")
      : hoursSinceLastMeal >= 6 && hoursSinceLastMeal <= 11
      ? setPetStatus("ok")
      : setPetStatus("happy");
  }, [hoursSinceLastMeal]);

  return (
    petStatus && (
      <Card className="childcard">
        <Card.Content className="outer-content">
          <Card.Header>{props.child.child_name}'s Stats</Card.Header>
          <Card.Content className="pet-info">
            <Image
              className="childcard-pet-image"
              src={`${props.child[petStatus]}`}
            ></Image>
            <Card.Meta>
              {props.child.pet_name}, XP: {props.child.pet_experience}
            </Card.Meta>
            {console.log(props)}
          </Card.Content>
        </Card.Content>
      </Card>
    )
  );
};

export default ChildCard;
