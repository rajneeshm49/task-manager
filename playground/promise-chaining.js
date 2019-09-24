require('../src/db/mongoose');
const Task = require('../src/models/task');

const deleteByIdAndCount = async (id, completed) => {
  await Task.findByIdAndDelete(id);
  return await Task.countDocuments({ completed });
};

deleteByIdAndCount('5d4ed4d197f3c00158c5f', false)
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log('e', e);
  });
