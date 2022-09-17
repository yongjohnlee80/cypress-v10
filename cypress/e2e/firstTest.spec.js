/// <reference types="cypress" />

const { describe, it } = require("node:test");

describe("Our first suite", () => {
  beforeEach("code for every test case", () => {});

  it("first test", () => {

    // by Tag Name
    cy.get('input')

    // by ID
    cy.get('#inputEmail')

    // by Class name
    cy.get('.input-full-width')

    // by Attribute name
    cy.get('[placeholder]')

    // by Attribute name and value
    cy.get('[placeholder="Email"]')

    // by Class value
    cy.get('[]')
  });

  it("second test", () => {});

  it("third test", () => {});
});
