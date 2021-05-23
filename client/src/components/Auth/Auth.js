import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import {signUp, signIn} from '../../actions/auth';

const initialState = {
  firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
}

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  }

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const googleSucess = async res => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try{
      dispatch({type: 'AUTH', data: {result, token}});
      history.push('/');
    }  catch(err) {
      console.log(err);
    }   
  }
  const googleFailure = () => {
    console.log("Google sign in was unsuccesful.Try again later");
  }

  const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword);
  const switchMode  = () =>{
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  }

  return(
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword} />
                {isSignUp && <Input name="confirmPassword" label="Repeat password" handleChange={handleChange} type="password" />}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignUp ? 'Sign Up': 'Sign In'}
            </Button>
            <GoogleLogin 
              clientId="342633321968-osqssj3k7m9oj19vadpubr5opiq7mtfi.apps.googleusercontent.com"
              onSuccess={googleSucess}
              onFailure={googleFailure} 
              render={(renderProps)=> (
                <Button 
                className={classes.googleButton} 
                color="primary" 
                fullWidth 
                onClick={renderProps.onClick}
                disabled={renderProps.disabled} 
                startIcon={<Icon />} 
                variant="contained" 
                cookiepolicy="single_host_origin"
                >
                  Google Sign in
                </Button>
              )}
            />
            <Grid container justify="flex-end">
                <Grid item>
                  <Button onClick={switchMode}>
                    {isSignUp ? 'Already have an account? Sign In': 'Don\'t have an account? Sign Up'}
                  </Button>
                </Grid>
            </Grid>
        </form>
      </Paper>
    </Container>
  )
}
export default Auth;
