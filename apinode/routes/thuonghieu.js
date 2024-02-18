var express = require("express");
var router = express.Router();
var db = require("./../server/server");

router.get("/", (req, res) => {
  var query = "Select * from thuonghieu";
  db.query(query, (error, result) => {
    if (error) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.get("/get-once/:id", function (req, res) {
  var query = "select * from thuonghieu where IDTH =" + req.params.id;
  db.query(query, function (err, result) {
    if (err) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.post("/update/:id", function (req, res) {
  var query =
    "update thuonghieu set TenTH='" +
    req.body.TenTH +
    "',XuatXu='" +
    req.body.XuatXu +
    "',HinhAnh='" +
    req.body.HinhAnh +
    "' where IDTH =" +
    req.params.id;
  console.log(req.body);
  db.query(query, function (err, result) {
    if (err) res.status(500).send("Sua khong thanh cong");
    res.json(result);
  });
});

router.post("/add", function (req, res) {
  var query =
    "INSERT INTO thuonghieu (TenTH,XuatXu HinhAnh) VALUES ('" +
    req.body.TenTH +
    "','" +
    req.body.XuatXu +
    "','" +
    req.body.HinhAnh +
    "')";
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message: "Da thuc hien thanh cong" });
  });
});

router.get("/remove/:id", function (req, res) {
  var query = "delete from thuonghieu where IDTH = " + req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send("Da xoa ban tin");
  });
});

module.exports = router;
