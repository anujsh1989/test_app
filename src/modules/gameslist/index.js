import axios from "axios";
import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import "./gameslist.css";

export default function Gameslist() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [genre, setGenre] = useState("");

  const onSearch = (val) => {
    let newArr = [...copyData];
    let filteredData = newArr.filter((item) => {
      if (item?.title?.toLowerCase().indexOf(val.toLowerCase()) > -1) {
        return item;
      }
    });
    setData([...filteredData]);
  };

  const onGenreSearch = (val) => {
    let newArr = [...copyData];
    let filteredData = newArr.filter((item) => {
      if (item?.genre?.toLowerCase().indexOf(val.toLowerCase()) > -1) {
        return item;
      }
    });
    setData([...filteredData]);
  };
  const onSortClickAsc = () => {
    let newArr = [...copyData];
    newArr.sort((a, b) => a?.score - b?.score);
    setData([...newArr]);
  };

  const onSortClickDsc = () => {
    let newArr = [...copyData];
    newArr.sort((a, b) => b?.score - a?.score);
    setData([...newArr]);
  };
  const onSortClickEdt = () => {
    let newArr = [...copyData];
    newArr.sort((a, b) => a?.editors_choice - b?.editors_choice);
    debugger;
    setData([...newArr]);
  };

  useEffect(() => {
    axios
      .get(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"
      )
      .then((resp) => {
        // console.log("resp is", resp);
        if (resp.status === 200) {
          setData(resp.data);
          setCopyData(resp.data);
        }
      })
      .catch((err) => {
        // console.log("err is", err);
      });
  }, []);
  return (
    <div className="gl-wrapper">
      <div className="gl-top">
        <input
          className="search"
          placeholder="Search by Title..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch(e.target.value);
          }}
        ></input>
        <input
          className="search"
          placeholder="Search By Genre..."
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            onGenreSearch(e.target.value);
          }}
        ></input>
        <button className="sort-btn" onClick={(e) => onSortClickAsc()}>
          Sort By Score Asc
        </button>
        <button className="sort-btn" onClick={(e) => onSortClickDsc()}>
          Sort By Score Des
        </button>
        <button className="sort-btn" onClick={(e) => onSortClickEdt()}>
          Sort By Editor
        </button>
      </div>
      <table className="table">
        <tr>
          <th className="th">Title</th>
          <th className="th">Platform</th>
          <th className="th">Score</th>
          <th className="th">Genre</th>
          <th className="th">Editor's Choice</th>
        </tr>
        <tbody>
          {data.map((item, index) => {
            // console.log("item", item);
            return (
              <tr className="tr" key={index.toString()}>
                <td className="td">{item.title}</td>
                <td className="td">{item.platform}</td>
                <td className="td">{item.score}</td>
                <td className="td">{item.genre}</td>
                <td className="td">{item.editors_choice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
