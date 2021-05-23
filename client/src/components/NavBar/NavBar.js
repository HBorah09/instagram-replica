import React, {useState, useEffect} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import {AppBar, Button, Toolbar, Typography, Avatar} from '@material-ui/core';
import {loggedInUser} from '../../utils';
import useStyles from './styles';
import memories from '../../images/memories.png';


const Navbar = () => {
  const classes = useStyles();
  const [user, setUser]  = useState(loggedInUser());
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decoded = decode(token);
      if (decode.exp * 1000< new Date().getTime()) {
        logout();
      }
    }
    
    setUser(loggedInUser());
  }, [location]);

  const logout = () => {
    dispatch({type: "LOGOUT"});
    history.push('/');
    setUser(null);
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" /> 
      </div>   
      <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.result?.name} >{user?.result?.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user?.result?.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
          ): (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
          )}
      </Toolbar>
      </AppBar>
  )
}

export default Navbar;