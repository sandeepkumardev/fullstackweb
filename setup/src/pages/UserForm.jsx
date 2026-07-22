// import React, { useState } from 'react'

// const UserForm = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleName = (e) => {
//         setName(e.target.value)
//     }

//     const handleEmail = (e) => {
//         setEmail(e.target.value)
//     }

//     const handlePassword = (e) => {
//         setPassword(e.target.value)
//     }

//   return (
//     <div style={{display: "flex", flexDirection: "column"}}>
//         <input value={name} onChange={handleName} placeholder='Name' />
//         <input value={email} onChange={handleEmail} placeholder='Email' />
//         <input value={password} onChange={handlePassword} placeholder='Password' />
//     </div>
//   )
// }

// export default UserForm

import React, { useState } from "react";

const UserForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  console.log(form);

  const handleForm = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    console.log(key, value);
    setForm({ ...form, [key]: value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input name="fullName" value={form.fullName} onChange={handleForm} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleForm} placeholder="Email" />
      <input name="password" value={form.password} onChange={handleForm} placeholder="Password" />
    </div>
  );
};

export default UserForm;
