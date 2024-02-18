var express = require("express");
var router = express.Router();
var db = require("./../server/server");

router.get("/", (req, res) => {
  var query = "Select * from loai";
  db.query(query, (error, result) => {
    if (error) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.get("/get-once/:id", function (req, res) {
  var query = "select * from loai where id =" + req.params.id;
  db.query(query, function (err, result) {
    if (err) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.post("/update/:id", function (req, res) {
  var query =
    "update loai set TenL='" +
    req.body.TenL +
    "',HinhAnh='" +
    req.body.HinhAnh +
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
    "INSERT INTO loai (TenL, HinhAnh) VALUES ('" +
    req.body.TenL +
    "','" +
    req.body.HinhAnh +
    "')";
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message: "Da thuc hien thanh cong" });
  });
});

router.get("/remove/:id", function (req, res) {
  var query = "delete from loai where ID = " + req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send("Da xoa ban tin");
  });
});

module.exports = router;
