import React, { useState, useEffect } from "react";
import { Icon, Image, Card } from "semantic-ui-react";
import { axiosWithAuth } from "./axiosAuth";
import "semantic-ui-css/semantic.min.css";

const ChildCard = props => {
  const [childEntries, setChildEntries] = useState("");

  useEffect(() => {
    axiosWithAuth()
      .get(
        `https://lambda-gigapet2.herokuapp.com/api/child/${props.child.child_id}/entries`
      )
      .then(res => setChildEntries(res.data));
  }, []);

  props && console.log(childEntries);
  return (
    <Card>
      <Card.Content>
        <Card.Header>{props.child.child_name}</Card.Header>
        {/* <Card.Description>{childEntries}</Card.Description> */}
      </Card.Content>
    </Card>
  );
};

export default ChildCard;
