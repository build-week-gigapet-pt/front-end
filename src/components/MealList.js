import React, { useState, useEffect } from "react";
import { Card, Accordion, Icon, Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import { axiosWithAuth } from "./axiosAuth";

const MealList = ({ childEntries }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  const removeEntry = id => {
    console.log("hello");
    axiosWithAuth()
      .delete(`https://lambda-gigapet2.herokuapp.com/api/entries/${id}`)
      .then(res => {
        axiosWithAuth()
          .get(
            `https://lambda-gigapet2.herokuapp.com/api/child/${childEntries[0][0].child_id}/entries`
          )
          .then(res => childEntries[1](res.data));
      })
      .catch(err => console.log(err));
  };

  return (
    <Card.Content className="meal-list">
      <h3>All Meals:</h3>
      {childEntries &&
        childEntries[0].map((entry, i) => {
          const mealdate = entry.date_update.split("T")[0];
          let dateparts = String(moment(mealdate)._d)
            .split(" ")
            .slice(0, 4);
          dateparts = `${dateparts[0]}. ${dateparts[1]} ${dateparts[2]}, ${
            dateparts[3]
          }`;

          return (
            <Accordion key={i}>
              <Accordion.Title
                active={activeIndex === i}
                index={i}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                {entry.meal}, {dateparts}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === i}>
                <ul>
                  <li>
                    <span className="stat-bit">
                      <strong>Food Eaten:</strong>
                    </span>{" "}
                    {entry.name}
                  </li>
                  <li>
                    <span className="stat-bit">
                      <strong>Food Category:</strong>
                    </span>{" "}
                    {entry.category}
                  </li>
                  <li>
                    <span className="stat-bit">
                      <strong>Quantity:</strong>
                    </span>{" "}
                    {entry.quantity}
                  </li>
                  <Container
                    className="remove-entry"
                    onClick={() => removeEntry(entry.id)}
                  >
                    Remove&nbsp;
                    <Icon name="trash alternate"></Icon>
                  </Container>
                </ul>
              </Accordion.Content>
            </Accordion>
          );
        })}
    </Card.Content>
  );
};

export default MealList;
