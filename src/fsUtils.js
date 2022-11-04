const fs = require('fs').promises;
const { join } = require('path');

const path = '/talker.json'; // atualizar

const readJSON = async () => {
  const data = await fs.readFile(join(__dirname, path), 'utf-8');
  return JSON.parse(data);
};

const writeJSON = async (data) => {
  await fs.writeFile(join(__dirname, path), JSON.stringify(data));
};

const readByID = async (id) => {
  const oldData = await readJSON();
  const findById = oldData.find((d) => d.id === id);
  return findById;
};

const updateJSON = async (id, data) => {
  const oldData = await readJSON();
  const updated = { id, ...data };
  const newData = oldData.reduce((acc, curr) => {
    if (curr.id === id) return [...acc, updated];
    return [...acc, curr];
  }, []);
  await writeJSON(newData);
  return newData;
};

const addDataJSON = async (data) => {
  const oldData = await readJSON();
  const newID = oldData[oldData.length - 1].id + 1;
  const newObj = { id: newID, ...data };
  const newData = [...oldData, newObj];
  await writeJSON(newData);
  return newData;
};

const deleteByID = async (id) => {
  const oldData = await readJSON();
  const filtered = oldData.filter((d) => d.id !== +id);
  await writeJSON(filtered);
  return filtered;
};

const writeToken = async (token) => {
  await fs.writeFile(join(__dirname, '/token.json'), JSON.stringify(token));
};

module.exports = {
  readJSON,
  readByID,
  writeJSON,
  updateJSON,
  addDataJSON,
  deleteByID,
  writeToken,
};
