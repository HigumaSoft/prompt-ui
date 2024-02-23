describe("Standalone", () => {
  const basicCheck = (name: string, url: string) => {
    describe(name, () => {
      beforeEach(() => {
        cy.visit(url);
      });

      it("Terminal is mounted", () => {
        cy.get("prompt").should("exist");
      });
    });
  };

  basicCheck("Standalone bundle", "e2e/standalone.html");
});
