const request = require('request');
const { expect, getRoute } = require('../../Test');

it('Index App', (done) => {
  request(getRoute('/'), (err, res) => {
    expect(res.body).to.equal('Welcome to Keek');
    done();
  });
});
