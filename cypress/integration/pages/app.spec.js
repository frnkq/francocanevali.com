describe('App', ()=>{
    it('Should redirect root to /home', ()=>{
        cy.visit('http://localhost:3000/');

        cy.url().should('include', 'home');
    });
});
