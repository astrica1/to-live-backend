const { Category } = require('./models/category.model');
const { User } = require('./models/user.model');

Category.create({
    name: 'category1',
});

User.create({
    username: 'user1',
    name: 'ali',
    email: 'ali@gmail.com',
    password: 'liuadvadjlcnj',
    isAdmin: '1'
});

User.create({
    username: 'user2',
    name: 'mammad',
    email: 'mammad@gmail.com',
    password: 'sljvnlsjvnsdljsd',
    isAdmin: '0'
});