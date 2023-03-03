const { Pokemon, Type, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe('name', () => {
      it('Should display an error if the name is NULL', (done) => {
        Pokemon.create({name: ''})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('Should display an error if the name has uppercase letters.', (done) => {
        Pokemon.create({name: 'RoccO'})
          .then(() => done(new Error('The name must be in lowercase')))
          .catch(() => done());
      });

      it('Should work when its a valid name', () => {
        Pokemon.create({ name: 'rocco' });
      });

    });

    describe('stats', () => {
      it('Should display an error if hp is not a number', (done) => {
        Pokemon.create({hp: 'ten'})
          .then(() => done(new Error('HP is not a number')))
          .catch(() => done());
      });

      it('Should display an error if attack is not a number', (done) => {
        Pokemon.create({attack: 'five'})
          .then(() => done(new Error('Attack is not a number')))
          .catch(() => done());
      });

      it('Should display an error if defense is not a number', () => {
        Pokemon.create({defense: 'nine'})
          .then(() => done(new Error('Defense is not a number')))
          .catch(() => done());
      });
    });
  });
});


describe('Type model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Type.sync({ force: true }));

    describe('name', () => {
      it('Should display an error if the name has numbers.', (done) => {
        Type.create({name: 'prueba8'})
          .then(() => done())
          .catch(() => done(new Error('The name must be letters.')));
      });

      it('Should work when its a valid name', () => {
        Type.create({ name: 'prueba' });
      });
    });
  });
});