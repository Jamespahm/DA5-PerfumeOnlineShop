var express = require("express");
var router = express.Router();
var db = require("./../server/server");

router.get("/", (req, res) => {
  var query = "Select * from taikhoanad";
  db.query(query, (error, result) => {
    if (error) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.get("/get-once/:id", function (req, res) {
  var query = "select * from taikhoanad where id =" + req.params.id;
  db.query(query, function (err, result) {
    if (err) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.post("/update/:id", function (req, res) {
  var query =
    "update taikhoanad set TenAD='" +
    req.body.TenAD +
    "',Email='" +
    req.body.Email +
    "',SoDienThoai='" +
    req.body.SoDienThoai +
    "',MatKhau='" +
    req.body.MatKhau +
    "' where ID =" +
    req.params.id;
  console.log(req.body);
  db.query(query, function (err, result) {
    if (err) res.status(500).send("Sua khong thanh cong");
    res.json(result);
  });
});

router.post("/add", function (req, res) {
  var query =
    "INSERT INTO taikhoanad (TenAD, Email, SoDienThoai, MatKhau) VALUES ('" +
    req.body.TenAD +
    "','" +
    req.body.Email +
    "','" +
    req.body.SoDienThoai +
    "','" +
    req.body.MatKhau +
    "')";
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send("Da them thanh cong");
  });
});

router.get("/remove/:id", function (req, res) {
  var query = "delete from taikhoanad where ID = " + req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send("Da xoa ban tin");
  });
});

module.exports = router;
