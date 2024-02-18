var express = require("express");
var router = express.Router();
var db = require("./../server/server");

router.get("/", (req, res) => {
  // Thực hiện các truy vấn MySQL ở đây
  db.query("select * from cthoadon", (error, results) => {
    if (error) {
      console.error("Error executing MySQL query: ", error);
      res.status(500).json({ error });
      return;
    }
    res.json(results);
  });
});

router.get("/get-once/:id", function (req, res) {
  var query = "select * from cthoadon where CTHD_ID = " + req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});

router.post('/update/:id', function (req, res) {
  var query =
    "update cthoadon set MaHD='" +
    req.body.MaHD +
    "',MaNH='" +
    req.body.MaNH +
    "',hinhAnh='" +
    req.body.hinhAnh +
    "',soLuong='" +
    req.body.soLuong +    
    "',giaBan='" +
    req.body.giaBan +
    "',tongTien='" +
    req.body.tongTien +
    "' where CTHD_ID =" +
    req.params.id;
    db.query(query, function (err, result) {
      if (err) throw err;
      res.status(200).json({ message: "Da thuc hien thanh cong" });
    });
});

router.post('/add', function (req, res) {
  var query =
    "INSERT INTO cthoadon (MaHD,MaNH,hinhAnh,soLuong,giaBan,tongTien) VALUES ('" +
    req.body.MaHD +
    "','" +
    req.body.MaNH +
    "','" +
    req.body.hinhAnh +
    "','" +
    req.body.soLuong +
    "','" +
    req.body.giaBan +
    "','" +
    req.body.tongTien +
    "')";
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message: "Da thuc hien thanh cong" });
  });
});

router.get("/remove/:id", function (req, res) {
  var query = "delete from cthoadon where CTHD_ID = " + req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send("Da xoa ban tin");
  });
});
router.get("/removebyMHD/:id", function (req, res) {
    var query = "delete from cthoadon where MaHD = " + req.params.id;
    db.query(query, function (err, result) {
      if (err) throw err;
      res.status(200).send("Da xoa ban tin");
    });
  });


module.exports = router;
