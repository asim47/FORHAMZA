import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { TextField, Button } from "@material-ui/core"
const App = (props) => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState(null);
  const [isAuth, setIsAuth] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    if (localStorage.getItem("token")) {


      const keepMeLogin = async () => {
        try {

          console.log("KEEP ME LOGIN REQUEST SEND");
          setIsLoading(true);

          let config = {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token")
            }
          }

          let res = await axios.get("https://assignmentforoffice.herokuapp.com/api/auth/user", config)

          setIsLoading(false);
          console.log(res.data);


          setUserData(res.data)
          setIsAuth(true)

        } catch (error) {

        }
      };

      keepMeLogin()

    }
  }, [])


  console.log(userData);




  const loginAction = async (e) => {
    e.preventDefault()
    const body = {
      "email": email,
      "password": password
    }
    console.log("going");
    try {
      setIsLoading(true)
      let res = await axios.post("https://assignmentforoffice.herokuapp.com/api/auth", body)
      console.log(res.data);
      setIsLoading(false)

      localStorage.setItem("token", res.data.token);

      setUserData(res.data.user)
      setIsAuth(true)

    } catch (error) {
      console.log(error.response.data.msg);
      setErrorMsg(error.response.data.msg)
      setIsLoading(false)

    }

  }


  const logout = (e) => {
    e.preventDefault()
    setUserData(null)
    setIsAuth(false)
    localStorage.removeItem("token")
  }

  return isLoading ? <h1>Loading....</h1> : (
    <Fragment>
      <h1> {isAuth ? "USER IS LOGGED IN" : "USER IS NOT LOGGED IN"}</h1>
      {
        isAuth ? (
          <Fragment>
            <Button variant="outlined" onClick={logout}>Logout</Button>

          </Fragment>
        ) : (
            <Fragment>
              <h1>please Login</h1>
              <TextField
                style={{ marginBottom: "10px" }}
                variant="outlined"
                color="primary"
                onChange={(e) => setEmail(e.target.value)}
                label="Enter Your Email" />
              <br />
              <TextField
                style={{ marginBottom: "10px" }}
                variant="outlined"
                color="primary"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Enter Your Password" />
              <br />

              <Button
                onClick={loginAction}
                variant="outlined"
                color="secondary"
              >Login</Button>
            </Fragment>
          )
      }

      {
        errorMsg && <h1 style={{ color: "red" }}>{errorMsg}</h1>
      }

      {/* <h1>
        {isAuth ? "USER IS LOGGED IN" : "USER IS NOT LOGGED IN"}
      </h1> */}

      <h1>
        {
          userData && userData.name
        }
      </h1>

    </Fragment>
  )
}
const mapStateToProps = (state) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, null)(App));
