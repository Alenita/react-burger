describe('Проект с возможностью перетаскивания ингредиентов', () => {
    before(function () {
        cy.visit('http://localhost:3000');
        cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients',
            {
                fixture: './ingredients.json',
            }).as('getIngredients')
        cy.wait('@getIngredients')
        
        cy.get('[data-test-id=burger-ingredient]').first().as('bun');        
        cy.get('[data-test-id=burger-ingredient]').as('ingredient');
        cy.get('[data-test-id=burger-constructor]').as('constructor');
        cy.get('[data-test-id=burger-constructor-bun]').first().as('constructorTopBun');
        cy.get('[data-test-id=burger-constructor-bun]').last().as('constructorBottomBun');
        cy.get('[data-test-id=burger-constructor-main]').as('constructorMain');
    });

    
    // it('Должен открываться на localhost:3000', function() {
    //   cy.visit('http://localhost:3000');
    // });

    it('Можно перетащить ингредиент из списка в конструктор бургера', () => {

        cy.get('[data-test-id=burger-ingredient]').as('ingredient');
        cy.get('@bun').trigger('dragstart');
        cy.get('@constructor').trigger('drop');
        cy.get('[data-test-id="constructorTopBun"]').should(
            'have.length',
            0
        );
        cy.get('[data-test-id="constructorBottomBun"]').should(
            'have.length',
            0
          );
    })
  }); 