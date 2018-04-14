import axios from "axios";

export default {
  logout:() => {
    return axios.get("/api/logout/")
  },
  //=========USERS==============
  findAllusers:() => {
    return axios.get("/api/users/");
  },
  createUser: (userInfo) => {
    return axios.post("/api/users/",userInfo);
  },
  findOneUser:(userInfo) => {
    return axios.get("/api/user/",{params:userInfo});
  },
  //=========DONORS==============
  findAllDonors: () => {
    return axios.get("/api/donors/");
  },
  findOneDonor: (id) => {
    return axios.get("/api/donor/"+id);
  },
  editDonor: (id, info) => {
    return axios.put("/api/donor/"+id, info)
  },
  //=========NONPROFIT==============
  findAllNonProfits: () => {
    return axios.get("/api/nonprofits/");
  },
  //perla changed to this
  findOneNonProfit: (id) => {
    return axios.get("/api/nonprofit/"+id);
  },
  editNonProfit: (id, info) => {
    return axios.put("/api/nonprofit/"+id, info)
  },
  //=========FOODPOST==============
  findAllFoodPosts: () => {
    return axios.get("/api/foodposts/");
  },
  findOneFoodPost: (id) => {
    return axios.get("/api/foodpost/" +id);
  },
  filterFoodPostsByDonor: (id) => {
    return axios.get("/api/foodposts/donor/"+id);
  },
  createNewPost: (foodInfo) => {
    return axios.post("/api/foodposts/",foodInfo);
  },
  editPost: (id, foodInfo) => {
    return axios.put("/api/foodpost/"+id, foodInfo);
  },
  deletePost: function(id, donorId) {
    return axios.delete("/api/foodpost/" + id + "/" + donorId);
  },
  //=========ADD/DELETE INTEREST==============
  addPostInterest: (info) => {
    return axios.post("/api/interests/",info)
  },
  removePostInterest: (info) => {
    return axios.post("/api/interests/remove",info)
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
