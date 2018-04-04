import axios from "axios";

export default {
    findAllusers:(query)=>{
      return axios.get(("/api/users/"));
    },
    createUser: (userInfo)=> {
      return axios.post("/api/users/",userInfo);
    },
    findOneuser:(userInfo)=>{
      console.log("userUseremail "+ userInfo.email);
      return axios.get("/api/user/",userInfo);
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
