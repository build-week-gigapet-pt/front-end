import React, { useState, useEffect } from "react";
import axios from "axios";

const GetCreds = () => {
  const [creds, setCreds] = useState();
  useEffect(() => {
    axios
      .post("https://lambda-gigapetZ.herokuapp.com/api/auth/register", {
        name: "GigaPet BuildTeam",
        email: "gp@buildteam.com",
        username: "GigaPet1",
        password: "bu1ldt3am",
        pin: "0008"
      })
      .then(res => setCreds(res))
      .catch(err => console.log(err));
  });

  return (
    <div>
      <ul>{creds}</ul>
    </div>
  );
};

export default GetCreds;
