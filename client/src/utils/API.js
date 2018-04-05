import axios from "axios";

export default {
    findAllusers:(query)=>{
      return axios.get(("/api/users/"),{params:query});
    },
    findUser:(queryEmail)=>{
        return axios.get(("/api/user/"+queryEmail),{params:queryEmail});
    },
    createUser: (userInfo)=> {
      console.log("This is trying to post to api/users")
      return axios.post("/api/users/", userInfo);
    }
    // // Gets all articles
    // getSavedarticles: function() {
    //   return axios.get("/api/savedarticles");
    // },
    // // Gets the book with the given id
    // getSavedarticle: function(id) {
    //   return axios.get("/api/savedarticles/" + id);
    // },
    // // Deletes the book with the given id
    // deleteSavedarticle: function(id) {
    //   return axios.delete("/api/savedarticles/" + id);
    // },
    // // Saves a book to the database
    // saveArticle: function(articleData) {
    //   return axios.post("/api/savedarticles", articleData);
    // }
  
  };
