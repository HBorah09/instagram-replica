import axios from 'axios';
import {loggedInUser} from '../utils';

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use(req => {
  const user = loggedInUser();
  if (user) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = newPost => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.post(`/posts/${id}`, updatedPost);
export const deletePost = id => API.delete(`/posts/${id}`);
export const likePost = id => API.post(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
