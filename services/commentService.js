const commentDao = require('../models/commentDao');
const jwt = require('jsonwebtoken');

const createComment = async (token, posting_id, comment) => {
  const user_id = jwt.verify(token, 'secretKey').userId;
  await commentDao.createComment(user_id, posting_id, comment);
};

const readComment = async posting_id => {
  const comments = await commentDao.readComment(posting_id);
  return comments;
};

const updateComment = async (comment_id, comment) => {
  await commentDao.updateComment(comment_id, comment);
};

const deleteComment = async comment_id => {
  await commentDao.deleteComment(comment_id);
};

module.exports = { createComment, readComment, updateComment, deleteComment };
