const db = require('../repositories/PostgreSQL/postgreSQL');

class UserService {
  
  async getUserById(id) {
    const { rows } = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
    return rows[0];
  }

  async createUser(name, email, password) {
    const { rows } = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password]
    );
    return rows[0];
  }

  async getUserByEmail(email) {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
  }

  async getAllUsers() {
    const { rows } = await db.query('SELECT id, name, email FROM users');
    return rows;
  }
}

module.exports = new UserService();