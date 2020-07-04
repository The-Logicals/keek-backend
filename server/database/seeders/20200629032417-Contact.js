module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Contacts', [
      {
        id: '2040d2be-9d9a-497d-97c3-01c5661d79f5',
        userId: '6517a6ea-662b-4eef-ab9f-20f89bd7099c',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '70b36cec-0dcb-48b4-b209-e7e7df530d98',
        userId: '70b36cec-0dcb-48b4-b209-e7e7df530d98',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface) => queryInterface.bulkDelete('Contacts', null, {}),
};
