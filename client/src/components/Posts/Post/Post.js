import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import useStyles from './styles';
import {deletePost, likePost} from '../../../actions/posts';
import {loggedInUser} from '../../../utils';

const Post = ({post, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = loggedInUser()?.result;
  const userId = user?._id || user?.googleId;
  const noOfLikes = post.likes.length;

  const renderLikes = () => {
    if (!user || !post.likes.includes(userId)) {
     return (
      <><ThumbUpOutlinedIcon fontSize="small" style={{marginRight: "5px"}} />{noOfLikes && `${noOfLikes} liked this post`}</>
     )
    }
     if (post.likes.includes(userId)) {
      return (
        <><ThumbUpAltIcon fontSize="small" style={{marginRight: "5px"}} />{noOfLikes > 1 ? `You and ${post.likes.length - 1} others liked this`: 'You liked this'}</>
      )
    } 
  }

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {post.creator === userId && (

      <div className={classes.overlay2}>
        <Button style={{color: 'white'}} size="small" onClick={()=>{setCurrentId(post._id)}}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      <div className={classes.details}>
        {post.tags.length > 1 ? <Typography variant="body2" color="textSecondary">{post.tags.map(tag=>`#${tag} `)}</Typography> : null}
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
      <CardContent>
         <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled={!user} onClick={()=>{dispatch(likePost(post._id))}}>
            {renderLikes()}
          </Button>
          {post.creator === userId && (
            <Button size="small" color="primary" onClick={()=>{dispatch(deletePost(post._id))}}>
              <DeleteIcon fontSize="small" />
            </Button>
          )}
      </CardActions>
    </Card>
  )
}

export default Post;