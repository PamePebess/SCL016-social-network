import { getCurrentUser } from '../data/currentUser.js';
import { allPosts } from './allPosts.js';

export const postProfile = () => {
  const profilePostDiv = document.createElement('div');
  profilePostDiv.id = 'profilePosts-div';
  const db = firebase.firestore();
  // Create a reference to the collection
  const currentUserPost = db.collection('allPosts');

  // Create a query against the collection.
  let userProfile = getCurrentUser().email;
  const myPosts = currentUserPost.where('user', '==', userProfile);
  db.collection('allPosts').where('user', '==', userProfile).get().then((querySnapshot) => {
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      const profilePosts = doc.data();
      console.log(profilePosts);

      const postContainer = document.createElement('div');
      postContainer.id = 'post-container';

      const profilePostsLi = document.createElement('li');
      profilePostsLi.id = 'profile-post-li';


      const profilePostsContainer = `<div id= "title-post-${doc.id}">${profilePosts.tittle}</div><div id= "content-post-${doc.id}">${profilePosts.content}</div>`;
      profilePostsLi.innerHTML += profilePostsContainer;  
      postContainer.appendChild(profilePostsLi);  
      profilePostDiv.appendChild(postContainer);
      console.log(doc.id, '=>', doc.data());

      db.collection("allPosts").doc(doc.id)
        .onSnapshot((newPost) => {
        console.log(`fue actualizado ${doc.id}`, newPost.data());
      
        const changedTittle = document.getElementById(`title-post-${doc.id}`);
        const changedContent = document.getElementById(`content-post-${doc.id}`);
        changedTittle.textContent = newPost.data().tittle;
        changedContent.textContent = newPost.data().content;
    });


      //EDITING CONTENT//

      //editing a post https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419

      const editionMenu = document.createElement('ul');
      editionMenu.id = 'edition-menu';
      const editLi = document.createElement('li');
      editLi.id = 'edit-li';
      editLi.textContent = 'edit';
      editionMenu.appendChild(editLi);
     

      const editModal = () => {
        console.log('me estoy haciendo click');

        const modalEditContent = document.createElement('div');
        modalEditContent.id = 'modal-edit-content';
      
        const spanCloseModal = document.createElement('span');
        spanCloseModal.id = 'span-close-modal';
        spanCloseModal.textContent = "X";
        spanCloseModal.addEventListener("click", ()=> {
        modalEditContent.style.display = "none";
      })
      
        const pEditTitle = document.createElement('p');
        pEditTitle.id = 'p-edit-title';
        pEditTitle.textContent = 'Titulo';
      
        const titleEdition = document.createElement('textarea');
        titleEdition.id = 'title-edit';
      
        const pEditContent = document.createElement('p');
        pEditContent.id = 'p-edit-content';
        pEditContent.textContent = 'Contenido';
      
        const contentEdition = document.createElement('textarea');
        contentEdition.id = 'edit-content';
        const editingMyPosts =()=> {
          const editMyPost = db.collection("allPosts").doc(doc.id);
          return editMyPost.update({
            tittle: titleEdition.value,
            content: contentEdition.value,
          })
          .then(() => {
            console.log("Document successfully updated!");
            modalEditContent.style.display = "none";
          })
          .catch((error) => {
            // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          });
        }
        const buttonSubmitEdition = document.createElement("button");
        buttonSubmitEdition.id = "button-submit-edittion";
        buttonSubmitEdition.textContent = "Save Changes";
        buttonSubmitEdition.addEventListener("click", editingMyPosts)

        
        modalEditContent.appendChild(buttonSubmitEdition);
        modalEditContent.appendChild(spanCloseModal);
        modalEditContent.appendChild(pEditTitle);
        modalEditContent.appendChild(titleEdition);
        modalEditContent.appendChild(pEditContent);
        modalEditContent.appendChild(contentEdition);
        profilePostDiv.appendChild(modalEditContent);

        // const modalTriggerButton = editLi;
        //   const modal1 = profilePostDiv;
        //   const modalCloseButton = spanCloseModal;
        //   // modalTriggerButton.addEventListener("click", event => {
        //   //     modal1.style.display = "flex";
        // modalCloseButton.addEventListener("click", event => {
        //           modal1.style.display = "none";
        //         })
        //   // })
        modalEditContent.display = 'initial';
        return modalEditContent;
      };
      editLi.addEventListener('click', editModal);

      //DELETING CONTENT

      const deleteLi = document.createElement('button');
      deleteLi.id = 'delete-li';
      deleteLi.textContent = 'delete';
      editionMenu.appendChild(deleteLi);
      postContainer.appendChild(editionMenu);

      //Delete a Post

      // const db = firebase.firestore();  
      let deleteMyPost = () => {
        db.collection('allPosts').doc(doc.id).delete().then(() => {
          //  profilePostsLi.textContent = "";
          //  postContainer.innerHTML = "";
          profilePostDiv.removeChild(postContainer);
          console.log('Document successfully deleted!');
        })
          .catch((error) => {
            console.error('Error removing document: ', error);
          });
      };
      deleteLi.addEventListener('click', deleteMyPost);
    });
  });      
  return profilePostDiv;
};