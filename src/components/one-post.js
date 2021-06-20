import { isLiked, likesFun } from './likes.js';

export const onePost = (docData, docId, buttonLike) => {
  // Initialize firebase firestore
  const db = firebase.firestore();

  const allPostsLi = document.createElement('li');
  allPostsLi.id = 'allPosts-li';

  const allPostContainer = document.createElement('div');
  const homePostsContainer = `<div id= "title-post-${docId}">${docData.tittle}</div>
  <div id= "content-post-${docId}">${docData.content}</div>`;

  allPostsLi.innerHTML += homePostsContainer;

  // Changes https://firebase.google.com/docs/firestore/query-data/listen
  db.collection('allPosts').doc(docId)
    .onSnapshot((newPost) => {
      const changedTittle = document.getElementById(`title-post-${docId}`);
      const changedContent = document.getElementById(`content-post-${docId}`);

      changedTittle.textContent = newPost.data().tittle;
      changedContent.textContent = newPost.data().content;
    });

  if (buttonLike) {
    const likeButtonEl = document.createElement('span');
    likeButtonEl.id = 'like-button';

    const iButtonEl = document.createElement('i');
    iButtonEl.classList.add('fas', 'fa-heart');
    likeButtonEl.appendChild(iButtonEl);

    // Post that Im going to update
    const postToUpdate = db.collection('allPosts').doc(docId);
    const alreadyLiked = isLiked(docData);

    if (alreadyLiked) {
      likeButtonEl.classList.add('liked');
    }

    likeButtonEl.addEventListener('click', likesFun(postToUpdate, alreadyLiked, likeButtonEl));
    allPostContainer.appendChild(likeButtonEl);
  }
  allPostContainer.appendChild(allPostsLi);

  return allPostContainer;
};
