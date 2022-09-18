/// <reference types="cypress" />

import { curry } from "cypress/types/lodash";

// const { describe, it } = require("node:test");

describe("Our first suite", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
  });

  it("first test", () => {
    // by Tag Name
    cy.get("input");

    // by ID
    cy.get("#inputEmail");

    // by Class name
    cy.get(".input-full-width");

    // by Attribute name
    cy.get("[placeholder]");

    // by Attribute name and value
    cy.get('[placeholder="Email"]');

    // by Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by Tag name and Attrivute with value
    cy.get('input[placeholder="Email"]');

    // by two different attriutes
    cy.get('[placeholder="Email"][type="email"]');

    // by tag name, attribute with value, ID and class name
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width');

    // The most recommended way by Cypress
    cy.get('[data-cy="imputEmail1"]');
  });

  it("second test", () => {
    cy.get('[data-cy="signInButton"]');

    cy.contains("Sign in");

    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it("then and wrap methods", () => {
    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputEmail1"]')
    //   .should("contain", "Email");
    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputPassword2"]')
    //   .should("contain", "Password");

    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputEmail1"]')
    //   .should("contain", "Email address");

    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputPassword1"]')
    //   .should("contain", "Password");

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();
      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        // const emailLabelSecond = secondForm
        //   .find('[for="exampleInputEmail1"]')
        //   .text();
        cy.wrap(secondForm)
          .find('[for="exampleInputEmail1"]')
          .should("contain", emailLabelFirst);

        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabelFirst).to.equal(passwordLabelSecond);
      });
    });
  });

  it("invoke command", () => {
    // 1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    // 2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal("Email address");
    });

    // 3
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      cy.wrap(label).should("contain", "Email address");
    });

    // 4
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    // Checkbox
    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      //   .then(classValue => {
      //     expect(classValue).to.contain('checked');
      //   })
      .should("contain", "checked");
  });

  it("assert property", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get("nb-calendar-day-picker").contains("17").click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "Sep 17, 2022");
      });
  });

  it("radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layout").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButton) => {
        cy.wrap(radioButton)
          .first()
          .check({ force: true })
          .should("be.checked");
        cy.wrap(radioButton).eq(1).check({ force: true });
        cy.wrap(radioButton).eq(0).should("not.be.checked");
        cy.wrap(radioButton).eq(2).should("be.disabled");
      });
  });

  it("lists and dropdowns", () => {
    cy.visit("/");
    // 1
    // cy.get('nav nb-select').click();
    // cy.get('.options-list').contains('Dark').click();
    // cy.get('nav nb-select').should('contain', 'Dark');
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');

    // 2 && alternative use cy.select() function.
    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").then((options) => {
        let itemLength = options.length;
        cy.wrap(options).each((listItem, idx) => {
          const itemText = listItem.text().trim();

          const colors = {
            Light: "rgb(255, 255, 255)",
            Dark: "rgb(34, 43, 69)",
            Cosmic: "rgb(50, 50, 89)",
            Corporate: "rgb(255, 255, 255)",
          };

          cy.wrap(listItem).click();
          cy.wrap(dropdown).should("contain", itemText);
          cy.get("nb-layout-header nav").should(
            "have.css",
            "background-color",
            colors[itemText]
          );
          if (idx < itemLength - 1) cy.wrap(dropdown).click();
        });
      });
    });
  });

  it.only("Web tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // 1
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("25");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).invoke("text").should("equal", "25");
      });

    // 2
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("Artem");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Bondar");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });
    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should("contain", "Artem");
        cy.wrap(tableColumns).eq(3).should("contain", "Bondar");
      });

    //3
    const ages = [20, 30, 40]

    cy.wrap(ages).each(age => {
      cy.get('thead [placeholder="Age"]').clear().type(String(age))
      cy.wait(500)
      cy.get('tbody tr').each(tableRow => {
        cy.wrap(tableRow).find('td').eq(6).should('contain', age)
      })
    })
  });
});
