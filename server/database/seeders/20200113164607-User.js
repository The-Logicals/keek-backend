module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Users', [
      {
        id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        fullName: 'John Doe',
        username: 'jd',
        email: 'john@gmail.com',
        password: '12345678',
        isVerified: true,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '70b36cec-0dcb-48b4-b209-e7e7df530d98',
        fullName: 'Jane Doe',
        username: 'jane',
        email: 'jane@gmail.com',
        password: '12345678',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
