const { myDataSource } = require('./typeorm-client');

// 사용자 회원가입
const createUser = async (params, password) => {
  await myDataSource.query(
    `INSERT INTO users(email, nickname, password) VALUES (?,?,?)`,
    [params.get("email"), params.get("nickname"), password]
  );
};

// 이메일 중복체크
const emailCheck = async (email) => {
  return await myDataSource.query(`SELECT email FROM users WHERE email = ?`, 
  [email]);
};

// 이메일로 사용자 정보 가지고 오기
const getUserByEmail = async (email) => {
  const [user] = await myDataSource.query(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  return user;
};

// 사용자 아이디로 정보 가지고 오기
const getUserById = async (id) => {
  return await myDataSource.query(
    `SELECT USER.id, USER.nickname, USER.profile_image, stack.name FROM users USER
    JOIN user_stack us ON us.user_id = USER.id
    JOIN stacks stack ON stack.id = us.stack_id
    WHERE user.id = ?`,
    [id]
  );
};

const updateUser = async (params, user_id) => {
  let query = `UPDATE UPDATE users SET `;
  let condition = ``;
  let where = ``;

  let param = [];
  
  let nickname = params.get("nickname");
  let profile_image = params.get("profile_image");

  if( nickname&& !profile_image) {
    condition = `nickname = ?`;
    param.push(nickname);
  }

  if(profile_image && !nickname) {
    condition = `profile_image = ?`;
    param.push(profile_image);
  }

  if(nickname && profile_image) {
    condition = `nickname = ?, profile_image = ?`;
    param.push(nickname);
    param.push(profile_image);
  }

  query = query + condition + where;
  await myDataSource.query(
    query, param
  );
};

module.exports = {
  createUser,
  emailCheck,
  getUserByEmail,
  getUserById,
  updateUser,
};
