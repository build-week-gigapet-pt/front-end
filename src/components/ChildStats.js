import React from "react";
import { Card, Button } from "semantic-ui-react";
const ChildStats = ({ lastMeal, hoursSinceLastMeal, petStatus }) => {
  return (
    <Card.Content
      className="child-stats"
      style={lastMeal === undefined ? { width: "80%" } : null}
    >
      {lastMeal !== undefined && (
        <Card.Description>
          <h3>Meal Stats:</h3>
          <p>
            <strong>Days Since Most Recent Meal: </strong>
            <span
              className={
                hoursSinceLastMeal / 24 > 1 ? "error-color" : "stat-bit"
              }
            >
              {Math.floor(hoursSinceLastMeal / 24)}
            </span>
          </p>
          <p>
            <strong>Hours Since Most Recent Meal:</strong>{" "}
            <span
              className={hoursSinceLastMeal > 24 ? "error-color" : "stat-bit"}
            >
              {hoursSinceLastMeal}
            </span>
          </p>
          <p>
            <strong>Current Mood: </strong>
            <span
              className={hoursSinceLastMeal > 24 ? "error-color" : "stat-bit"}
            >
              {petStatus.charAt(0).toUpperCase() + petStatus.slice(1)}
            </span>
          </p>

          <h3>Most Recent Meal Info:</h3>
          <p>
            <strong>Meal:</strong>{" "}
            <span className="stat-bit">{lastMeal.meal}</span>
          </p>
          <p>
            <strong>Category:</strong>{" "}
            <span className="stat-bit">{lastMeal.category}</span>
          </p>
          <p>
            <strong>Contents:</strong>{" "}
            <span className="stat-bit">{lastMeal.name}</span>
          </p>
        </Card.Description>
      )}
      {lastMeal === undefined && (
        <Card.Description className="no-stats">
          <h2>No meal stats available...</h2>
          <Button>Add Meal +</Button>
        </Card.Description>
      )}
    </Card.Content>
  );
};

export default ChildStats;
