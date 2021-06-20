import { onePost } from './one-post.js';

export const allPosts = () => {
  const allPostDiv = document.createElement('div');
  allPostDiv.id = 'allPosts-div';

  // Initialize firebase firestore
  const db = firebase.firestore();
  // Get all documents in a collection https://firebase.google.com/docs/firestore/query-data/get-data
  db.collection('allPosts').get().then((querySnapshot) => {
    // For each post create a html element (li, div and button)
    querySnapshot.forEach((doc) => {
      const onePostEl = onePost(doc.data(), doc.id, true);
      onePostEl.classList.add('allpost-container');
      allPostDiv.appendChild(onePostEl);
    });
  });
  return allPostDiv;
};
