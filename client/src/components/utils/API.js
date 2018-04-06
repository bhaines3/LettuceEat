import axios from "axios";

export default {
  //=========USERS==============
  findAllusers:() => {
    return axios.get("/api/users/");
  },
  createUser: (userInfo) => {
    return axios.post("/api/users/",userInfo);
  },
  findOneuser:(userInfo) => {
    //console.log("in API"+userInfo);
    //console.log("im in API email find one user "+ userInfo.email);
    return axios.get("/api/user/",{params:userInfo});
  },
  //=========DONORS==============
  findAllDonors: () => {
    return axios.get("/api/donors/");
  },
  findOneDonor: (id) => {
    return axios.get("/api/donor/"+id);
  },
  //=========NONPROFIT==============
  findAllNonProfits: () => {
    return axios.get("/api/nonprofit/");
  },
  findOneNonProfit: (id) => {
    return axios.get("/api/nonprofit/"+id);
  },
  //=========FOODPOST==============
  findAllFoodPosts: () => {
    return axios.get("/api/foodposts/");
  },
  filterFoodPostsByDonor: (id) => {
    return axios.get("/api/donor/foodpost/"+id);
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
