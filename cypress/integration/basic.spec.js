context("The Readalong Component (test xml and m4a file)", () => {
  /**
   * Wait for the audio and the SMIL to load.
   */
  const EXPECTED_LOADING_TIME = 2000; // ms

  const FOR_PAGE_TURN_ANIMATION = 500; // ms
  const FOR_ERIC_TO_TALK_A_BIT = 3000; // ms

  beforeEach(() => {
    cy.visit("/ej-fra/");
  });
  //new test
  it("should load successfully", () => {
    cy.readalongElement()
      .should("be.visible")
      .invoke("attr", "language")
      .should("equal", "fra");
  });

  it("should play the entire ReadAlong", () => {
    cy.wait(EXPECTED_LOADING_TIME);

    cy.readalong().within(() => {
      cy.get("[data-cy=play-button]").click();
      cy.wait(FOR_ERIC_TO_TALK_A_BIT);
      cy.get("[data-cy=stop-button]").click();
    });
  });

  it("should play a single word when clicked", () => {
    cy.wait(EXPECTED_LOADING_TIME);

    cy.readalong().contains("technologies").click();
  });

  describe("the progress bar", () => {
    it("should skip ahead when clicked", () => {
      cy.wait(EXPECTED_LOADING_TIME);

      cy.readalong().within(() => {
        cy.get("[data-cy=play-button]").click();
        cy.get("[data-cy=page-count__current]")
          .filter("*:visible")
          .invoke("text")
          .should("eq", "1");

        cy.get("[data-cy=progress-bar]")
          .as("progress-bar")
          .then((el) => {
            // click 3/4 of the way in the readalong (should be second page)
            cy.get("@progress-bar").click(el.width() * 0.85, el.height() * 0.5);  // change 0.75 to 0.85 to avoid occasional unpaging
          });
        cy.get("[data-cy=stop-button]").click();
        cy.wait(FOR_PAGE_TURN_ANIMATION);

        cy.get("[data-cy=page-count__current]")
          .filter("*:visible")
          .invoke("text")
          .should("eq", "2");
      });
    });
  });
});

context("The Readalong Component (test xml and mp3 file)", () => {
  /**
   * Wait for the audio and the SMIL to load.
   */
  const EXPECTED_LOADING_TIME = 2000; // ms

  const FOR_ONE_TO_TALK_A_BIT = 3000; // ms

  beforeEach(() => {
    cy.visit("/udhr-gla/");
  });
  //new test
  it("should load successfully", () => {
    cy.readalongElement()
      .should("be.visible")
      .invoke("attr", "language")
      .should("equal", "gla");
  });

  it("should play the entire ReadAlong", () => {
    cy.wait(EXPECTED_LOADING_TIME);

    cy.readalong().within(() => {
      cy.get("[data-cy=play-button]").click();
      cy.wait(FOR_ONE_TO_TALK_A_BIT);
      cy.get("[data-cy=stop-button]").click();
    });
  });

  it("should play a single word when clicked", () => {
    cy.wait(EXPECTED_LOADING_TIME);

    cy.readalong().contains("reusanta").click();
  });
});

context("The Readalong Component (test xml and wav file)", () => {
  /**
   * Wait for the audio and the SMIL to load.
   */
  const EXPECTED_LOADING_TIME = 2000; // ms

  const FOR_AIDAN_TO_TALK_A_BIT = 6000; // ms

  beforeEach(() => {
    cy.visit("/ap_dan/");
  });
  //new test
  it("should load successfully", () => {
    cy.readalongElement()
      .should("be.visible")
      .invoke("attr", "language")
      .should("equal", "en");
  });

  it("should have the correctly aligned tag compared with the xml with invalid tag below", () => {
    cy.wait(EXPECTED_LOADING_TIME);
    cy.readalongElement().should("be.visible");
    cy.readalong().within(() => {
      cy.get("[data-cy=text-container]").should(($el) => {
        expect($el.children().length).equal(1, "has text");
      });
      cy.get("[data-cy=audio-error]")
        .should("have.class", "fade")
        .should("not.be.visible");
      cy.get("[data-cy=control-panel]")
        .should("have.length", 1)
        .should("be.visible");
      //check tag number should be correct
      cy.get("[class='sentence__text theme--light']").should("have.length", 74);
      cy.get("[data-cy=alignment-error]")
        .should("have.class", "fade")
        .should("not.be.visible");
      cy.get("[data-cy=progress-bar]")
        .should("have.length", 1)
        .should("be.visible");
    });
  });

  it("should play the entire ReadAlong", () => {
    cy.wait(EXPECTED_LOADING_TIME);

    cy.readalong().within(() => {
      cy.get("[data-cy=play-button]").click();
      cy.wait(FOR_AIDAN_TO_TALK_A_BIT);
      cy.get("[data-cy=stop-button]").click();
    });
  });

  it("should play a single word when clicked", () => {
    cy.wait(EXPECTED_LOADING_TIME);

    cy.readalong().contains("urbefolkeningerne").click();
  });
});

context("The Readalong Component (test xml with other tag and wav file) should work correctly with invalid tag", () => {
  /**
   * Wait for the audio and the SMIL to load.
   */
  const EXPECTED_LOADING_TIME = 2000; // ms

  const FOR_AIDAN_TO_TALK_A_BIT = 6000; // ms

  beforeEach(() => {
    cy.visit("/ap_dan/index-other-tag-3.html");
  });
  //new test
  it("should load successfully", () => {
    cy.readalongElement()
      .should("be.visible")
      .invoke("attr", "language")
      .should("equal", "en");
  });

  it("should omit the invalid tag and align correctly", () => {
    cy.wait(EXPECTED_LOADING_TIME);
    cy.readalongElement().should("be.visible");
    cy.readalong().within(() => {
      cy.get("[data-cy=text-container]").should(($el) => {
        expect($el.children().length).equal(1, "has text");
      });
      cy.get("[data-cy=audio-error]")
        .should("have.class", "fade")
        .should("not.be.visible");
      cy.get("[data-cy=control-panel]")
        .should("have.length", 1)
        .should("be.visible");
      //check there should be one more tag with sentence_text than the original xml
      cy.get("[class='sentence__text theme--light']").should("have.length", 75);
      cy.get("[data-cy=alignment-error]")
        .should("have.class", "fade")
        .should("not.be.visible");
      cy.get("[data-cy=progress-bar]")
        .should("have.length", 1)
        .should("be.visible");
    });
  });

  it("should play the entire ReadAlong", () => {
    cy.wait(EXPECTED_LOADING_TIME);

    cy.readalong().within(() => {
      cy.get("[data-cy=play-button]").click();
      cy.wait(FOR_AIDAN_TO_TALK_A_BIT);
      cy.get("[data-cy=stop-button]").click();
    });
  });

  it("should play a single word when clicked", () => {
    cy.wait(EXPECTED_LOADING_TIME);

    cy.readalong().contains("urbefolkeningerne").click();
  });
});
