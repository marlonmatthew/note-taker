const router = require("express").Router();
const noteTaker = require("../db/noteTaker");

router.get("/notes", function (req, res) {
  noteTaker
    .get_note()
    .then(function (notes) {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/notes", function (req, res) {
  noteTaker
    .add(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

router.delete("/notes/:id", function (req, res) {
  noteTaker
    .remove(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
