const util = require("util");
const fs = require("fs");
const uuid = require("uuid");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class noteTaker {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  get_note() {
    return this.read().then(function (notes) {
      let parsed;
      try {
        parsed = [].concat(JSON.parse(notes));
      } catch (err) {
        parsed = [];
      }
      return parsed;
    });
  }

  add(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' are blank");
    }
    const new_note = { title, text, id: uuid.v1() };
    return this.get_note()
      .then((notes) => [...notes, new_note])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => new_note);
  }

  remove(id) {
    return this.get_note()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new noteTaker();
