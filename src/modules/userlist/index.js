import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RouteNames from "../../router/routernames";
import "./userlist.css";

export default function Userlist() {
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [value, setValue] = useState([]);
  const Authorization = `Bearer ${localStorage.Authorization}`;
  const navigate = useNavigate();

  const onLogoutClick = () => {
    localStorage.clear();
    window.location.reload();
  };
  const search = (val) => {
    // console.log("value is", val);
    let newArr = [...copyData];
    let filtered = newArr.filter((item) => {
      if (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
        return item;
      }
    });
    // console.log("filtered", filtered);
    setData([...filtered]);
  };

  useEffect(() => {
    if (localStorage?.id?.length === 0 || !localStorage?.id) {
      navigate(RouteNames.LOGIN_PATH);
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://restapi.adequateshop.com/api/users?page=1", {
        headers: { Authorization: Authorization },
      })
      .then((resp) => {
        // console.log("response is", resp);
        if (resp.status === 200) {
          setData(resp.data.data);
          setCopyData(resp.data.data);
          //   console.log("Data is ", resp.data.data);
        }
      })
      .catch((err) => {
        console.log("err is", err);
      });
  }, [Authorization]);

  return (
    <div className="ul-wrapper">
      <input
        className="search"
        placeholder="Search..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          search(e.target.value);
        }}
      ></input>
      <button className="logout-btn" onClick={(e) => onLogoutClick()}>
        Logout
      </button>
      ``
      {data.map((item) => {
        return (
          <div className="user-info">
            <div className="ul-left">
              <img className="ul-pp" src={item.profilepicture} alt="PP"></img>
            </div>
            <div className="ul-right">
              <p className="ul-info-para">{`ID: ${item.id}`}</p>
              <p className="ul-info-para">{`Name: ${item.name}`}</p>
              <p className="ul-info-para">{`E-mail: ${item.email}`}</p>
              <p className="ul-info-para">{`Location: ${item.location}`}</p>
              <p className="ul-info-para">{`Creation Date: ${item.createdat}`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
