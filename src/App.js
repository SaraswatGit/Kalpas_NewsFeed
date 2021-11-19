import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import validator from "validator";
import countryList from "./countrylist";
import Newsfeed from "./newsfeed";
import { cardcontext } from "./Context/cardviewcontext";
function App() {
  const [posts, setposts] = useState([]);
  const [cardview, setcardview] = useState(true);
  const [feedbackmodal, setfeedback] = useState(false);
  const [newsmodal, setnewsback] = useState(false);
  const [input, setinput] = useState("");
  const [showcountrylist, setshowcountrylist] = useState(false);
  const [country, setcountry] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
      const responseposts = res.data;
      setposts(responseposts);
    });
  }, []);
  return (
    <cardcontext.Provider value={{ cardview, setcardview }}>
      <div
        className="App"
        style={{ display: "flex", height: "100vh", width: "100vw" }}
      >
        <div
          style={{
            height: "92vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(234,241,248)",
            width: "20vw",
            paddingTop: "8vh",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              backgroundColor: "white",
              padding: "1vw",
              width: "15vw",
              flexDirection: "column",
            }}
          >
            <span style={{ fontWeight: "bold" }}> Hi Reader ,</span>

            <div>Here's your news !</div>
          </div>
          {!feedbackmodal && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                padding: "1vw",
                width: "15vw",
                flexDirection: "column",
                marginTop: "5vh",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "3vh" }}>
                View Toggle
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "2vh",
                  borderRadius: "10%",
                  backgroundColor: "#D3D3D3",
                }}
              >
                <div
                  className={
                    "bi bi-card-heading " +
                    (cardview ? " toggleclicked" : " icons")
                  }
                  style={{
                    fontSize: "5vh",
                    padding: "2vh",
                    borderTopLeftRadius: "10%",
                    borderBottomLeftRadius: "10%",
                  }}
                  onClick={() => setcardview(true)}
                ></div>
                <div
                  className={
                    "bi bi-card-list icons" +
                    (!cardview ? " toggleclicked" : " icons")
                  }
                  style={{
                    fontSize: "5vh",
                    padding: "2vh",
                    borderTopRightRadius: "10%",
                    borderBottomRightRadius: "10%",
                  }}
                  onClick={() => setcardview(false)}
                ></div>
              </div>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2vh",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              marginTop: "5vh",
              width: "15vw",
            }}
          >
            <div style={{ fontSize: "3vh", fontWeight: "bold" }}>
              Have a Feedback ?
            </div>
            <div
              className={feedbackmodal ? "buttonclicked" : "button"}
              style={{
                fontSize: "2vh",
                padding: "1vh",
                fontWeight: "bold",
                marginTop: "2vh",
              }}
              onClick={() => {
                setfeedback(!feedbackmodal);
              }}
            >
              We're Listening !
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgb(220,231,243)",
          }}
        >
          <Newsfeed view={cardview} newsdata={posts} />
        </div>
        {feedbackmodal && (
          <form
            style={{
              backgroundColor: "rgb(234,241,248)",
              height: "94vh",
              padding: "3vh",
              position: "absolute",
              marginLeft: "20vw",
              display: "flex",
              flexDirection: "column",
              width: "50vw",
            }}
            autocomplete="false"
          >
            <h2>Thank you so much for taking the time !</h2>
            <div style={{ marginTop: "1vh" }}>
              Please provide the below details{" "}
            </div>
            <label for="name" style={{ fontWeight: "bold", marginTop: "3vh" }}>
              First Name
            </label>
            <input
              type="text"
              style={{
                backgroundColor: "white",
                width: "25vw",
                border: "none",
                marginTop: "2vh",
              }}
            />
            <label for="name" style={{ fontWeight: "bold", marginTop: "3vh" }}>
              Last Name
            </label>
            <input
              type="text"
              style={{
                backgroundColor: "white",
                width: "25vw",
                border: "none",
                marginTop: "2vh",
              }}
            />
            <br />
            <label for="address" style={{ fontWeight: "bold" }}>
              Address
            </label>
            <textarea
              id="address"
              rows="4"
              columns="25"
              style={{ marginBottom: "3vh", marginTop: "2vh", border: "none" }}
            ></textarea>
            <label
              for="address"
              style={{ fontWeight: "bold", marginBottom: "2vh" }}
            >
              Country
            </label>
            <input
              type="search"
              placeholder="Country"
              style={{ width: "25vw", border: "none" }}
              onChange={(event) => {
                setinput(event.target.value);
                setshowcountrylist(true);
              }}
              autocomplete="new-password"
              value={input}
            />
            {showcountrylist && (
              <div
                style={{
                  width: "24.5vw",
                  paddingTop: "0.5vh",
                  paddingLeft: "0.5vh",
                  backgroundColor: "white",
                  height: "30vh",
                  overflow: "auto",
                }}
              >
                {countryList
                  .filter((val) => {
                    if (input === "") {
                      return val;
                    } else if (
                      val.toLowerCase().includes(input.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((val) => {
                    return (
                      <div
                        style={{
                          paddingTop: "0.5vh",
                          paddingLeft: "0.5vh",
                          marginTop: "0.2vh",
                        }}
                        className="listitem"
                        onClick={() => {
                          setcountry(val);
                          setshowcountrylist(false);
                        }}
                      >
                        {val}
                      </div>
                    );
                  })}
              </div>
            )}
            <label for="email" style={{ fontWeight: "bold", marginTop: "3vh" }}>
              Email
            </label>
            <input
              type="email"
              onChange={(event) => {
                setemail(event.target.value);
              }}
              style={{ width: "25vw", border: "none", marginTop: "2vh" }}
            />
            <div style={{ color: "red", fontSize: "1.5vh", marginTop: "0.5" }}>
              {!validator.isEmail(email) && "Please Enter a valid mail"}
            </div>
            <label
              for="number"
              style={{ fontWeight: "bold", marginTop: "3vh" }}
            >
              Phone No.
            </label>
            <input
              type="text"
              onChange={(event) => {
                setnumber(event.target.value);
              }}
              style={{ width: "25vw", border: "none", marginTop: "2vh" }}
            />
            <div style={{ color: "red", fontSize: "1.5vh", marginTop: "0.5" }}>
              {!validator.isMobilePhone(number) &&
                "Please Enter a valid number"}
            </div>
            <div
              className="submit"
              style={{
                marginTop: "3vh",
                padding: "1.5vh",
                fontSize: "2vh",
                width: "15vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                border: "none",
              }}
              onClick={() => {
                setfeedback(false);
              }}
            >
              Submit
            </div>
          </form>
        )}
      </div>
    </cardcontext.Provider>
  );
}

export default App;
