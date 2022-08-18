import React, {useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { StyledModal } from './StyledModal';
import {useAuth} from '../AuthContext.jsx';
import axios from 'axios';
import { AllContext } from "../../index.jsx";
import {Grid, Paper, Avatar, TextField, Button, Typography, Checkbox, FormControlLabel} from "@mui/material";
// import Link as MUILinkfrom '@mui/material/Link';
import { LockOutlinedIcon } from '@mui/icons-material';


const LoginForm = () => {

  //----------------State Hooks  -------------------------
  const {email, setEmail } = useContext(AllContext);
  const {accountType, setAccountType} = useContext(AllContext);
  // const {login, googleLogin} = useAuth();
  const {firstName, setFirstName} = useContext(AllContext);
  const {lastName, setLastName} = useContext(AllContext);
  const {preferredIndustry, setPreferredIndustry} = useContext(AllContext);
  const {zipCode, setZipCode} = useContext(AllContext);
  const {company, setCompany} = useContext(AllContext);
  const {coord_lat, setCoord_lat} = useContext(AllContext);
  const {coord_long, setCoord_long} = useContext(AllContext);
  const {resuemUrl, setResumeUrl} = useContext(AllContext);
  const {defaultJobs, setDefaultJobs} = useContext(AllContext);
  const {appliedJobs, setAppliedJobs} = useContext(AllContext);
  const {uuid, setUuid} = useContext(AllContext);
  const { login } = useAuth();
  // local states
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
//----------------Modal Functions ----------------------
  const hideModal = () => {
    setModalOpen(false);
  };
  //----------------Embedded Functions -------------------
  const handlePlainLogin = async () => {
    setLoading(true);
    const r = await login(email, password);
    const uid = r.user.uid;
    const res = await axios.get(`/jobs/${uid}/signon`);
    console.log(res.data);
    await setUuid(res.data.user_uuid);
    await setAccountType(res.data.account_type);
    await setFirstName(res.data.first_name);
    await setLastName(res.data.last_name);
    await setCompany(res.data.company_name);
    await setCoord_lat(res.data.coord_lat);
    await setCoord_long(res.data.coord_long);
    await setResumeUrl(res.data.resume_url);
    await setZipCode(res.data.zip);
    await setPreferredIndustry(res.data.pref_industry);
    await setAppliedJobs(res.data.defaultJobs);
    await setDefaultJobs(res.data.appliedJobs);
    if (res.data.account_type === "seeker") {
      navigate("/seeker", { replace: true });
    } else if (res.data.account_type === "recruiter") {
      navigate("/recruiter", { replace: true });
    }
      setLoading(false);
  }
  //---------------- DOM Return -------------------------
  return (
    <>
      {/* Plug in your title here */}
      <h1 onClick={() => setModalOpen(true)} > Click Here to Login </h1>

      {/* Modal Section */}
      <StyledModal
        show={modalOpen}
        handleClose={hideModal}>
        <div className="login__container">
          <div>Email </div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-Mail Address"/>
          <div>Password</div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          <button onClick={() => handlePlainLogin()}> Login </button>
          {/* <button onClick={() => handleGoogleLogin()}>Login with Google</button> */}
        </div>
        <div>
          Don't have an account? <Link to="signUp">Create</Link> an account now.
        </div>
      </StyledModal>
    </>
  )
}

export default LoginForm;