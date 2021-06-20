import { getCurrentUser } from '../data/currentUser.js';

//  "Is the post liked?"
export const isLiked = (post) => {
  for (let i = 0; i < post.likes.length; i += 1) {
    if (post.likes[i] === getCurrentUser().email) {
      return true;
    }
  }
  return false;
};

// This Function is called when user clicks "likeButtonEl"
export const likesFun = (postToUpdate, alreadyLiked1, likeButtonElem) => {
  let alreadyLiked = alreadyLiked1;
  return () => {
  // Conditional if is liked or not send information to firestore https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#update_elements_in_an_array
    if (alreadyLiked) {
      // Its true, that means  the user alreary liked the post, so we need to remove it
      postToUpdate.update({
        likes: firebase.firestore.FieldValue.arrayRemove(getCurrentUser().email),
      });
      console.log('Unlike :(');
      likeButtonElem.classList.remove('liked');
      // Set to false
      alreadyLiked = false;
    } else {
      //  is false, that means the user has not liked the post, so we need to put it
      postToUpdate.update({
        likes: firebase.firestore.FieldValue.arrayUnion(getCurrentUser().email),
      });
      console.log('like :)');
      likeButtonElem.classList.add('liked');

      alreadyLiked = true;
    }
  };
};
