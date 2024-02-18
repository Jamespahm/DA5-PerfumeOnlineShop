var express = require("express");
var db = require("./../server/server");

router.get("/", function (req, res) {
  var query = "select * from slide";
  db.query(query, (error, result) => {
    if (error) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.get("/get-once/:id", function (req, res) {
  var query = "select * from slide where id =" + req.params.id;
  db.query(query, (error, result) => {
    if (error) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

var path =require('path');
var duongdan = path.join(__dirname, '../public');


router.post('/upload', function (req, res) {
    var filepath ='';
    var fileload = null;
    if(!req.files) res.status(400).send('Chua chon file gui len');
    fileload = req.file.fileload;
    filepath = duongdan+ '/ipload/'+ fileload.name;
    fileload.mv(filepath, function (err) {
        if (err)
          return res.status(500).send(err);
        res.send('File uploaded!');
      });
});
// var public = path.join(__dirname, '../public');

router.post('/upload', function (req, res) {
  let sampleFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('Khong co file upload.');
  }
  console.log('den day');
  sampleFile = req.files.fileanh;
  uploadPath = '../app/public/images' + sampleFile.name;
  console.log(uploadPath);
  sampleFile.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);
    res.send('File uploaded!');
  });
})
