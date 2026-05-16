import BaseRepository from '../../../shared/repositories/base.repository.js';
import db from '../../../database/index.js';

class UserRepository extends BaseRepository {
  constructor() {
    super(db.models.User);
  }

  async findByEmail(email) {
    return this.findOne({ where: { email } });
  }

  async findByUsername(username) {
    return this.findOne({ where: { username } });
  }
}

export default new UserRepository();
