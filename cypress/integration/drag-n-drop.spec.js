describe('Проект с возможностью перетаскивания ингредиентов', () => {
    beforeEach(function () {
        cy.visit('http://localhost:3000');
        
        cy.get('[data-test-id=burger-ingredient]').first().as('bun');        
        cy.get('[data-test-id=burger-ingredient]').as('ingredient');
        cy.get('[data-test-id=burger-constructor]').as('constructor');
        cy.get('[data-test-id=burger-constructor-bun]').first().as('constructorTopBun');
        cy.get('[data-test-id=burger-constructor-bun]').last().as('constructorBottomBun');
        cy.get('[data-test-id=burger-constructor-main]').as('constructorMain');
        cy.get('[data-test-id=total-cost]').as('totalCost');
    });

    it('Можно добавить булки в конструктор', () => {
        cy.get('@bun').trigger('dragstart');
        cy.get('@constructor').trigger('drop');
        cy.get('@constructorTopBun').should(
            'have.length',
            1
        );
        cy.get('@constructorBottomBun').should(
            'have.length',
            1
        );
    });

    it('Можно добавить основные ингредиенты в конструктор', () => {
        cy.get('[data-test-id=burger-ingredient]').eq(5).as('sauce');
        cy.get('[data-test-id=burger-ingredient]').eq(7).as('meat');
        cy.get('[data-test-id=burger-ingredient]').eq(10).as('onion');

        cy.get('@sauce').trigger('dragstart');
        cy.get('@constructor').trigger('drop');

        cy.get('@meat').trigger('dragstart');
        cy.get('@constructor').trigger('drop');

        cy.get('@onion').trigger('dragstart');
        cy.get('@constructor').trigger('drop');

        cy.get('@totalCost').contains('1725');
    });

    it('Можно удалить ингредиент из конструктора', () => {
        cy.get('[data-test-id=burger-ingredient]').eq(5).as('sauce');
        cy.get('[data-test-id=burger-ingredient]').eq(7).as('meat');

        cy.get('@sauce').trigger('dragstart');
        cy.get('@constructor').trigger('drop');

        cy.get('@meat').trigger('dragstart');
        cy.get('@constructor').trigger('drop');

        cy.get('.constructor-element').eq(1).find('.constructor-element__action').click();
        cy.get('@constructorMain').should('have.length', 1);
    });
}); 