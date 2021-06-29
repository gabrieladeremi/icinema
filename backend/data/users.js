import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Kazeem Adewole',
    email: 'adewole@kazeem.com',
    password: bcrypt.hashSync('1234567', 10),
    isAdmin: true,
  },
  {
    name: 'Tester Tester',
    email: 'tester@example.com',
    password: bcrypt.hashSync('1234567', 10),
  },
]
export default users
