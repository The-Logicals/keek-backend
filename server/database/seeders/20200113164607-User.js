module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Users', [
      {
        id: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        fullName: 'John Doe',
        username: 'jd',
        email: 'john@example.com',
        password: '12345678',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '70b36cec-0dcb-48b4-b209-e7e7df530d98',
        fullName: 'Jane Doe',
        username: 'jane',
        email: 'jane@example.com',
        password: '12345678',
        isVerified: true,
        resetToken: '41b5d17a-b2b9-40fa-9587-6bd7c93ab5a9',
        resetTokenExpiry: new Date('2016-01-17T18:05:00.000+00:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
