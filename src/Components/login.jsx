import React, { useState } from 'react';
import Axios from 'axios';

const apiUrl = "http://localhost:8085"

// Axios.interceptors.request.use(
//   config => {
//     const { origin } = new URL(config.url);
//     const allowedOrigins = [apiUrl];
//     const token = localStorage.getItem('token');
//     if (allowedOrigins.includes(origin)) {
//       config.headers.authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

const LoginPage = () => {
  const storedToken = localStorage.getItem('token')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [nameReg, setNameReg] = useState("")
  const [emailReg, setEmailReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")
  
  const [token, setToken] = useState(storedToken || null)

  const getJwtLogin = async () => {
    const { data } = await Axios.post(`${apiUrl}/api/users/signin/`, {
      email: email,
      password: password,
    });
    localStorage.setItem('token', data.message.token);
    setToken(data.message.token);
  };

  const logOut = () => {
    localStorage.clear()
    setToken(null)
  }

  // const login = () => {
  //   Axios.post("http://localhost:8085/api/users/signin/", {
  //       email: email,
  //       password: password,
  //   }).then(response => {
  //       console.log(response)
  //       setToken(response.data.message.token)
  //       getJwtLogin()
  //       console.log(token)
  //   })
  // }

  const registerUser = () => {
    Axios.post(`${apiUrl}/api/users/`, {
      name: nameReg,
      email: emailReg,
      password: passwordReg,
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error.error)
    })
  };

  const getTest = async () => {
    const thisToken = localStorage.getItem('token')
    const getto = await Axios.get(`http://localhost:8085/api/users/2/`, {
      headers: {
        'Authorization': `Bearer ${thisToken}`
      }
    })
    console.log(getto.data)
  }

  return (
      <div>
          <div className="header">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password..."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={getJwtLogin}> Login </button>
          <button onClick={getTest}>Just Get</button>
          <button onClick={logOut}>Logout</button>
          <br/>
          <br/>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setNameReg(e.target.value);
            }}
          />
          <br/>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmailReg(e.target.value);
            }}
          />
          <br/>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
          <br/>
          <button onClick={registerUser}> Register </button>
          </div>
      </div>
  )
}

export default LoginPage