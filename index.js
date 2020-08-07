var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const fs = require('fs');
const router = express.Router();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

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
  console.log('contact_us link')
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

router.get("/getImagesCount", function (request, response) {
  const length = fs.readdirSync('assets/images/gal').length;
  console.log(length)
  response.send({imgLength:length});
});
router.post("/sendmail", function (request, response) {
  var respData={};
  var form = request.body;
  console.dir("form", form);
  var auth_email = "sssnursingtest@gmail.com";
  var auth_pass = "Welcome@12345";
  var to_emails = "ranjeetborade21@gmail.com,shrisainursingschool@gmail.com";

  var thanks_msg = '<h1>Shri Sai School Of Nursing, Umred</h1>'+
  '<h2>Thank you for contacting us '+form.form_name+'</h2>'+
  '<p>We have received your enquiry and will respond to you within 24 hours.  For urgent enquiries please call us on one of the telephone numbers below.</p>';

  var inquiry_msg = '<h1>Shri Sai School Of Nursing, Umred</h1><h2>Inquiry received from '+form.form_name+'</h2><h4>Details of inquiry</h4><table> <tr> <th>Name</th> <td>'+form.form_name+'</td> </tr> <tr> <th>Email</th> <td>'+form.form_email+'</td> </tr> <tr> <th>Contact No</th> <td>'+form.form_phone+'</td> </tr> <tr> <th>Subject</th> <td>'+form.form_subject+'</td> </tr> <tr> <th>Message</th> <td>'+form.form_message+'</td> </tr></table>'

  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: auth_email,
      pass: auth_pass
    }
  });

  let thnksMailDetails = {
    from: auth_pass,
    to: form.form_email,
    subject: "Thank You For Contacting To Shri Sai School Of Nursing, Umred ",
    html: thanks_msg
  };

  let inquiryMailDetails = {
    from: auth_pass,
    to: to_emails,
    subject: "Inquiry Received From "+form.form_name,
    html: inquiry_msg
  };

  

  mailTransporter.sendMail(thnksMailDetails, function (err, data) {
    if (err) {
      console.log('error occurs in thank you email sending');
     // console.log('err, data',err, data);
      //respData.status = false;
      //respData.message = "Internal server error occured, Please try again";
      //response.send(respData);
    } else {
      console.log('thank you email sent successfully');
      //respData.status = true;
      //respData.message = "Your message has been successfully sent. We will contact you very soon!";
      //response.send(respData);
    }
  });

  mailTransporter.sendMail(inquiryMailDetails, function (err, data) {
    if (err) {
      console.log('error occurs in inquiry email sending');
      console.log('err, data',err, data);
      respData.status = false;
      respData.message = "Internal server error occured, Please try again";
      response.send(respData);
    } else {
      console.log('inquiry email sent successfully');
      respData.status = true;
      respData.message = "Your message has been successfully sent. We will contact you very soon!";
      response.send(respData);
    }
  });



  
  
});



//add the router
app.use("/", router);
app.listen(PORT || 3000);

console.log("Server Running at Port " + PORT);
