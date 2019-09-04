import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./axiosAuth";

const Profile = props => {
  const [data, setData] = useState({});

  useEffect(() => {
    axiosWithAuth()
      .get("https://lambda-gigapet2.herokuapp.com/api/parent/1")
      .then(res => {
        console.log(res);
        setData(res.data);
      });
  }, []);
  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.img_url} alt={`This is ${data.name}'s profile image`} />
      <h2>Children:</h2>
    </div>
  );
};

export default Profile;
