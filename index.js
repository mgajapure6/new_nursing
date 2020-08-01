var express = require("express");
var app = express();
var path = require("path");
const router = express.Router();
const PORT = process.env.PORT || 5000;

router.use("/assets", express.static(__dirname + "/assets"));
//app.use(express.static(__dirname + '/pages'));

router.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/pages/index/index.html"));
});

router.get("/home", function (request, response) {
  response.sendFile(path.join(__dirname + "/pages/home/home.html"));
});

// router.get("/dashboard", function (request, response) {
//   response.sendFile(path.join(__dirname + "/pages/dashboard/dashboard2.html"));
// });

router.get("/contact_us", function (request, response) {
  response.sendFile(path.join(__dirname + "/pages/contact/contact.html"));
});

router.get("/about_us", function (request, response) {
  response.sendFile(path.join(__dirname + "/pages/about_us/about_us.html"));
});

router.get("/our_courses", function (request, response) {
  response.sendFile(path.join(__dirname + "/pages/courses/courses.html"));
});

router.get("/campus_tour", function (request, response) {
  response.sendFile(path.join(__dirname + "/pages/campus_tour/campus_tour.html"));
});

router.get("/student_life", function (request, response) {
  response.sendFile(path.join(__dirname + "/pages/student_life/student_life.html"));
});

router.get("/gallery", function (request, response) {
  response.sendFile(path.join(__dirname + "/pages/gallery/gallery.html"));
});



//add the router
app.use("/", router);
app.listen(PORT || 3000);

console.log("Server Running at Port " + PORT);
