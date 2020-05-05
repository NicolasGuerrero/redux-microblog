import {
  ADD_POST,
  REMOVE_POST,
  UPDATE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_TITLES,
  GET_POST
} from './actions/actionTypes';
import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
  posts: {},
  titles: []
}

export default function rootReducer(state = INITIAL_STATE, action) {
  let postId;
  let p;
  switch (action.type) {

    case GET_POST:
      return { ...state, posts: { ...state.posts, [action.post.id]: action.post } };

    case ADD_POST:
      return { ...state, posts: { ...state.posts, [action.payload.id]: { ...action.payload.post, comments: [] } } };

    case UPDATE_POST:
      postId = action.payload.id;
      let updatedPost = {
        ...action.payload.post,
        comments: [...state.posts[postId].comments]
      };
      return { posts: { ...state.posts, [postId]: updatedPost } }

    case REMOVE_POST:
      postId = action.payload.id;

      let postStateCopy = { ...state };
      delete postStateCopy.posts[postId]
      return { ...postStateCopy };

    case ADD_COMMENT:
      postId = action.payload.postId;
      let newComment = { id: uuid(), ...action.payload.comment }

      p = state.posts[postId];

      return {
        posts: {
          ...state.posts,
          [postId]: {
            ...p,
            comments: [...p.comments, newComment]
          }
        }
      }

    case REMOVE_COMMENT:
      postId = action.payload.postId;
      let commentId = action.payload.commentId;
      let commentStateCopy = [...state.posts[postId].comments];

      let updatedComments = commentStateCopy.filter(c => c.id !== commentId)

      p = state.posts[postId];
      return {
        posts: {
          ...state.posts,
          [postId]: {
            ...p,
            comments: [...updatedComments]
          }
        }
      }

    case GET_TITLES:
      return { ...state, titles: [...action.titles] };

    default:
      return state;
  }

}
