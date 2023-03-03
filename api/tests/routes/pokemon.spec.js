/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, Type, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'rocco',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png'
};

const type = {
  name: 'prueba'
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));

  describe('Search by id', () => {
    it('Should get 200 if Pokemon id exists', () =>
      agent.get('/pokemons/6').expect(200)
    );

    it('Should get 400 if Pokemon id does not exist', () =>
      agent.get('/pokemons/0').expect(400)
    );
  });

  describe('Search by name', () => {
    it('Should get 200 if Pokemon name exists', () =>
      agent.get('/pokemons?name=rocco').expect(200)
    );

    it('Should get 400 if Pokemon name does not exist', () =>
      agent.get('/pokemons?name=arizmende').expect(400)
    );
  });
});


describe('Type routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Type.sync({ force: true })
    .then(() => Type.create(type)));

  describe('All types pokemon', () => {
    it('Should get 200', () =>
      agent.get('/types').expect(200)
    );
  });
});
