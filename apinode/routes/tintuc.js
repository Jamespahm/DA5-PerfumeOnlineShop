var express = require("express");
var router = express.Router();
var db = require("./../server/server");

router.get("/", (req, res) => {
  var query = "Select * from tintuc";
  db.query(query, (error, result) => {
    if (error) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.get("/get-once/:id", function (req, res) {
  var query = "select * from tintuc where id =" + req.params.id;
  db.query(query, function (err, result) {
    if (err) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.post("/update/:id", function (req, res) {
  var query =
    "update tintuc set TieuDe='" +
    req.body.TieuDe +
    "',NoiDung='" +
    req.body.NoiDung +
    "',NgayDang='" +
    req.body.NgayDang +
    "',HinhAnh='" +
    req.body.HinhAnh ++
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
    "INSERT INTO tintuc (TieuDe, NoiDung, NgayDang, HinhAnh) VALUES ('" +
    req.body.TieuDe +
    "','" +
    req.body.NoiDung +
    "','" +
    req.body.NgayDang +
    "','" +
    req.body.HinhAnh  +
    "')";
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message: "Da thuc hien thanh cong" });
  });
});

router.get("/remove/:id", function (req, res) {
  var query = "delete from tintuc where ID = " + req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send("Da xoa ban tin");
  });
});

module.exports = router;
