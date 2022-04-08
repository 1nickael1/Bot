const { Collection } = require("discord.js");
const path = require("path");
const fs = require("fs");

const root = path.dirname(require.main.filename || process.mainModule.filename);

const listCommands = (category) => {
  const tempCommands = [];
  fs.readdirSync(`${root}/commands/${category}`)
    .filter((fileName) => fileName.endsWith(".js"))
    .forEach((file) => tempCommands.push(file.replace(".js", "")));
  return tempCommands;
};

const fetchCommand = (category, command) =>
  // eslint-disable-next-line global-require, import/no-dynamic-require, implicit-arrow-linebreak
  require(`${root}/commands/${category}/${command}.js`);

const listCategories = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  fs.readdirSync(`${root}/commands/`).filter((name) => !name.endsWith(".js"));

const fetchCategories = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  listCategories().forEach((category) => {
    module.exports.categories.set(category, listCommands(category));
  });

const fetchCommands = (commandCategory) => {
  if (commandCategory) {
    return module.exports.categories.get(commandCategory).forEach((command) => {
      module.exports.commands.set(
        command,
        // eslint-disable-next-line comma-dangle
        fetchCommand(commandCategory, command)
      );
    });
  }

  return listCategories().forEach((category) => {
    module.exports.categories.get(category).forEach((command) => {
      module.exports.commands.set(command, fetchCommand(category, command));
    });
  });
};

module.exports = {
  commands: new Collection(),
  categories: new Collection(),
  listCommands,
  fetchCommand,
  listCategories,
  fetchCategories,
  fetchCommands,
  init: () => {
    fetchCategories();
    fetchCommands();
  },
};
