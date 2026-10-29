beforeEach(() =>{
  cy.login('murilo@teste.com','Teste123')
})

describe('Fluxo CRUD complete', () => {
  let produto = 'Mouse sem fio' + Math.random()

  it('Fluxo de CRUD', () => {
    cy.visit('https://front.serverest.dev/admin/home')
    cy.get('[data-testid="cadastrar-produtos"]').click()
    cy.get('[data-testid="nome"]').type(produto)
    cy.get('[data-testid="preco"]').type('150')
    cy.get('[data-testid="descricao"]').type('sem fio, com bateria de 25 horas')
    cy.get('[data-testid="quantity"]').type('50')
    cy.get('[data-testid="cadastarProdutos"]').click()
    cy.get('h1').contains('Lista dos Produtos')
    cy.get('tbody').should('be.visible')
    cy.get('td').should('include.text', produto)
    cy.get('tr').each(($row) => {
      if($row.find('td').eq(0).text() === produto){
        $row.find('td').eq(5).children('div').children('.btn-danger').click()
      }
    })
    cy.get('td').should('not.include.text', produto)
  })
}) 

describe('Feature Product', () => {
  let produto1 = 'Mouse sem fio' + Math.random()
  let produto2 = 'Mousepad' + Math.random()

 it('Fluxo de CRUD API', () => {
    cy.productRegistration(produto2, '15', 'Mousepad Novo', '25')
    cy.visit('https://front.serverest.dev/admin/listarprodutos')
    cy.get('h1').contains('Lista dos Produtos')
    cy.get('tbody').should('be.visible')
    cy.get('td').should('include.text', produto2)
    cy.get('tr').each(($row) => {
      if($row.find('td').eq(0).text() === produto2){
        $row.find('td').eq(5).children('div').children('.btn-danger').click()
      }
    })
    cy.get('td').should('not.include.text', produto2)
  })
}) 