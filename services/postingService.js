const postingDao = require('../models/postingDao');
const jwt = require('jsonwebtoken');

const createPosting = async (
  token,
  classification,
  volume,
  onoffline,
  progress_period,
  stack,
  start_date,
  contact,
  contact_content,
  title,
  contents
) => {
  const params = {
    token,
    classification,
    volume,
    onoffline,
    progress_period,
    stack,
    start_date,
    contact,
    contact_content,
    title,
    contents,
  };
  for (const [key, value] of Object.entries(params)) {
    if (value == false || value == undefined) {
      const error = new Error(`${key} value not entered!`);
      error.status = 400;
      throw error;
    }
  }
  const stacks = stack.split(',');
  if (stacks.length > 5) {
    const error = new Error('Too many stacks selected!');
    error.status = 400;
    throw error;
  }
  // token 복호화
  const user_id = jwt.verify(token, 'secretKey').userId;

  await postingDao.createPosting(
    classification,
    volume,
    onoffline,
    progress_period,
    stacks,
    start_date,
    contact,
    contact_content,
    user_id,
    title,
    contents
  );
};

const updatePosting = async (
  token,
  posting_id,
  classification,
  volume,
  onoffline,
  progress_period,
  stack,
  start_date,
  contact,
  contact_content,
  title,
  contents
) => {
  const stacks = stack.split(',');
  // token 복호화
  const user_id = jwt.verify(token, 'secretKey').userId;

  await postingDao.updatePosting(
    user_id,
    posting_id,
    classification,
    volume,
    onoffline,
    progress_period,
    stacks,
    start_date,
    contact,
    contact_content,
    title,
    contents
  );
};

const deletePosting = async (token, posting_id) => {
  const user_id = jwt.verify(token, 'secretKey').userId;

  await postingDao.deletePosting(user_id, posting_id);
};

const getOnePost = async post_id => {
  return await postingDao.getOnePost(post_id);
};

const getPostList = async (user_id, stacks) => {
  return await postingDao.getPostList(user_id, stacks);
};

module.exports = {
  createPosting,
  updatePosting,
  deletePosting,
  getOnePost,
  getPostList,
};
