import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./App.css";
import { width } from "dom-helpers";
import { cardcontext } from "./Context/cardviewcontext";

const Newsfeed = (props) => {
  const [uposts, setuposts] = useState(props.newsdata);
  const [cview, setcview] = useState(props.view);
  const { cardview, setcardview, posts } = useContext(cardcontext);

  const [fpage, setfpage] = useState(1);
  const [cpage, setcpage] = useState(2);
  const [npage, setnpage] = useState(3);
  const [title, settitle] = useState(3);
  const [desc, setdesc] = useState(3);
  const [newsmodal, setnewsmodal] = useState(false);
  const [activepage, setactivepage] = useState(posts.slice(0, 8));
  const [activeindex, setactiveindex] = useState(3);
  const [limit, setlimit] = useState(0);
  const deletenews = (id) => {
    setactivepage(
      activepage.filter((val) => {
        return val.id !== id;
      })
    );
  };
  function setcred(t, d) {
    settitle(t);
    setdesc(d);
  }

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
      const responseposts = res.data;
      setuposts(responseposts);
      setactivepage(responseposts.slice(0, 8));
    });
  }, []);
  let limit = Math.ceil(uposts.length / 8);
  function handlenext() {
    if (npage !== limit) {
      setfpage(fpage + 1);
      setcpage(cpage + 1);
      setnpage(npage + 1);
    }
  }
  function handleprev() {
    if (fpage !== 1) {
      setfpage(fpage - 1);
      setcpage(cpage - 1);
      setnpage(npage - 1);
    }
  }

  let posts2 = [];
  let i, j;
  for (i = 0, j = 0; i < uposts.length + 8; i += 8, j++) {
    posts2[j] = uposts.slice(i, i + 8);
  }
  function handlenew(num) {
    setactivepage(posts2[num]);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "80vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {newsmodal && (
        <div
          style={{
            position: "absolute",
            marginTop: "40vh",
            marginLeft: "6vw",
            padding: "1vw",
            backgroundColor: "lightblue",
            width: "50vw",
            height: "30vh",
            border: "10px",
          }}
        >
          <div
            style={{
              marginLeft: "48vw",
              fontSize: "2vw",
              color: "lightblue",
              fontWeight: "bold",
              color: "black",
            }}
            onClick={() => {
              setnewsmodal(!newsmodal);
            }}
          >
            X
          </div>
          <b> {title}</b>
          <br />
          <br />
          {desc}
        </div>
      )}
      {cardview ? (
        <div className="grid-display">
          {activepage.map((val, key) => {
            return (
              <div
                style={{
                  width: "17vw",
                  height: "35vh",
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "2vh",
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    marginLeft: "16vw",
                    fontSize: "1vw",
                    width: "17vw",
                    marginTop: "1vh",
                  }}
                  onClick={() => deletenews(val.id)}
                >
                  X
                </div>
                <div
                  style={{
                    padding: "3vh",
                    display: "flex",
                    justifyContent: "center",
                    width: "15vw",
                    height: "30vh",
                  }}
                  onClick={() => {
                    setnewsmodal(true);
                    setcred(val.title, val.body);
                  }}
                >
                  {val.title}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-display">
          {activepage.map((val, key) => {
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    width: "60vw",
                    backgroundColor: "white",
                    marginBottom: "2vh",
                    height: "4vh",
                    padding: "2vh",
                  }}
                  onClick={() => {
                    setnewsmodal(true);
                    setcred(val.title, val.body);
                  }}
                >
                  {val.title}
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    marginLeft: "1vw",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    height: "2vw",
                    width: "2vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1vw",
                  }}
                  onClick={() => deletenews(val.id)}
                >
                  X
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80vw",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          className="pagbutton"
          style={{ fontSize: "4vh", fontWeight: "bolder" }}
          onClick={handleprev}
        >
          &lt;
        </span>
        <span
          className="navbutton"
          onClick={() => {
            handlenew(fpage - 1);
          }}
        >
          {" "}
          {fpage}{" "}
        </span>
        <span
          className="navbutton"
          onClick={() => {
            handlenew(cpage - 1);
          }}
        >
          {" "}
          {cpage}{" "}
        </span>
        <span
          className="navbutton"
          onClick={() => {
            handlenew(npage - 1);
          }}
        >
          {" "}
          {npage}{" "}
        </span>
        <span
          className="pagbutton"
          style={{ fontSize: "4vh", fontWeight: "bolder" }}
          onClick={handlenext}
        >
          &gt;
        </span>
      </div>
    </div>
  );
};
export default Newsfeed;
