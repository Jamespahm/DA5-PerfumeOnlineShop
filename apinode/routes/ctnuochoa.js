var express = require("express");
var router = express.Router();
var db = require("./../server/server");

router.get("/", (req, res) => {
  // Thực hiện các truy vấn MySQL ở đây
  db.query("select * from ctnuochoa", (error, results) => {
    if (error) {
      console.error("Error executing MySQL query: ", error);
      res.status(500).json({ error });
      return;
    }
    res.json(results);
  });
});

router.get("/get-once/:id", function (req, res) {
  var query = "select * from ctnuochoa where ID = " + req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});

router.post('/update/:id', function (req, res) {
  var query =
    "update ctnuochoa set MaNH='" +
    req.body.MaNH +
    "',HinhAnh1='" +
    req.body.HinhAnh1 +
    "',HinhAnh2='" +
    req.body.HinhAnh2 +
    "',HinhAnh3='" +
    req.body.HinhAnh3 +
    "',HinhAnh4='" +
    req.body.HinhAnh4 +
    "',HinhAnh5='" +
    req.body.HinhAnh5 +
    req.body.MoTa +
    "' where ID =" +
    req.params.id;
    db.query(query, function (err, result) {
      if (err) throw err;
      res.status(200).json({ message: "Da thuc hien thanh cong" });
    });
});

router.post('/add', function (req, res) {
  var query =
    "INSERT INTO ctnuochoa (MaNH,HinhAnh1,HinhAnh2,HinhAnh3,HinhAnh4,HinhAnh5,MoTa) VALUES ('" +
    req.body.MaNH +
    "','" +
    req.body.HinhAnh1 +
    "','" +
    req.body.HinhAnh2 +
    "','" +
    req.body.HinhAnh3 +
    "','" +
    req.body.HinhAnh4 +
    "','" +
    req.body.HinhAnh5 +
    "','" +
    req.body.MoTa +
    "')";
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message: "Da thuc hien thanh cong" });
  });
});

router.get("/remove/:id", function (req, res) {
  var query = "delete from ctnuochoa where ID = " + req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send("Da xoa ban tin");
  });
});



module.exports = router;
