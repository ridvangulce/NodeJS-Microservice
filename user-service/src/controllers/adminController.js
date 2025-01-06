const User = require('../models/user');

// Kullanıcıları listeleme
const listUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcılar alınamadı', error });
  }
};

// Kullanıcı silme
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'Kullanıcı silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı silinemedi', error });
  }
};

// Yeni kullanıcı oluşturma
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'Kullanıcı oluşturuldu', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı oluşturulamadı', error });
  }
};

module.exports = {
  listUsers,
  deleteUser,
  createUser,
};
