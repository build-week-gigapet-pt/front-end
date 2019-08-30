import React, { useState, useEffect } from "react";
import { Card, Accordion, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const MealList = ({ childEntries }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  useEffect(() => {}, [childEntries]);
  console.log(childEntries);

  return (
    <Card.Content className="meal-list">
      <h3>All Meals:</h3>
      {childEntries &&
        childEntries.map((entry, i) => {
          const mealdate = entry.date_update.split("T")[0];
          return (
            <Accordion key={i}>
              <Accordion.Title
                active={activeIndex === i}
                index={i}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                {entry.meal}, {mealdate}
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
                </ul>
              </Accordion.Content>
            </Accordion>
          );
        })}
    </Card.Content>
  );
};

export default MealList;
