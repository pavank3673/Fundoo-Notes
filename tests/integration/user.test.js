import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';

let newUser = {
  firstName: 'tester',
  lastName: 'one',
  email: 'tester@gmail.com',
  password: 'password5'
};

let newNote = {
  title: 'testtitle',
  description: 'testdescription',
  color: 'testcolor'
};

let token;
var noteId;

describe('APIs Integration Test', () => {
  describe('User APIs Test', () => {
    it('Post /users should register with user data success', (done) => {
      request(app)
        .post('/api/v1/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });

    it('Post /users should register with user data fail', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({ firstName: 'tester', lastName: 'one' })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(422);
          done();
        });
    });

    it('Post /users should login with user credentials success', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({ email: newUser.email, password: newUser.password })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.data).to.be.an('string');
          token = res.body.data;
          done();
        });
    });

    it('Post /users should login with user credentials fail', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({ email: newUser.email })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(422);
          done();
        });
    });
  });

  describe('Note APIs Test', () => {
    it('POST /notes should create a note for logged in user success', (done) => {
      request(app)
        .post('/api/v1/notes')
        .send(newNote)
        .set({ authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.data).to.be.an('object');
          console.log('res.body.data.noteId' + res.body.data.noteId);
          noteId = res.body.data.noteId;
          done();
        });
    });

    it('POST /notes should create a note for logged in user fail', (done) => {
      request(app)
        .post('/api/v1/notes')
        .send({ title: newNote.title })
        .set({ authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(422);
          done();
        });
    });

    it('GET /notes should get all notes for logged in user success', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set({ authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('GET /notes should get all notes for logged in user fail', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set({ authorization: `Bearer demotoken` })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(403);
          done();
        });
    });

    it('GET /notes/:id should get note by id for logged in user success', (done) => {
      request(app)
        .get(`/api/v1/notes/${noteId}`)
        .set({ authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });

    it('GET /notes/:id should get note by id for logged in user fail', (done) => {
      request(app)
        .get(`/api/v1/notes/noteone`)
        .set({ authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(422);
          done();
        });
    });

    it('UPDATE /notes/:id should update note of given id for logged in user success', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteId}`)
        .send(newNote)
        .set({ authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });

    it('UPDATE /notes/:id should update note of given id for logged in user fail', (done) => {
      request(app)
        .put('/api/v1/notes/noteone')
        .send(newNote)
        .set({ authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(422);
          done();
        });
    });

    it('PATCH /notes/:id/isArchived should toggle archive note of given id for logged in user success', (done) => {
      request(app)
        .patch(`/api/v1/notes/${noteId}/isArchived`)
        .set({ authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('PATCH /notes/:id/isArchived should toggle archive note of given id for logged in user fail', (done) => {
      request(app)
        .patch('/api/v1/notes/noteone/isArchived')
        .set({ authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(422);
          done();
        });
    });

    it('PATCH /notes/:id/isTrashed should toggle trash note of given id for logged in user success', (done) => {
      request(app)
        .patch(`/api/v1/notes/${noteId}/isTrashed`)
        .set({ authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('PATCH /notes/:id/isTrashed should toggle trash note of given id for logged in user fail', (done) => {
      request(app)
        .patch(`/api/v1/notes/noteone/isTrashed`)
        .set({ authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(422);
          done();
        });

      it('DELETE /notes/:id should delete note of given id for logged in user success', (done) => {
        request(app)
          .delete(`/api/v1/notes/${noteId}`)
          .set({ authorization: `Bearer ${token}` })
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });

      it('DELETE /notes/:id should delete note of given id for logged in user fail', (done) => {
        request(app)
          .delete(`/api/v1/notes/${noteId}`)
          .set({ authorization: 'Bearer demotoken' })
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(403);
            done();
          });
      });
    });
  });
});
