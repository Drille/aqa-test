/// <reference types="cypress" />


describe('Part two of AQA test', () => {
    beforeEach(() => {
        cy.visit('/')
        //   перейти у розділ "Initial" через верхнє меню
        cy.get('.sticky').contains('INITIAL').click()
        // cy.visit('collection/initials')
    })
    // знайти модель з назвою 'Náhrdelník Mon Petit' і перейти на її сторінку,
    // перевірити тіло і код респонсів, які отримуються при цьому з api
    it('check responses on page', () => {
        cy.get('.w-full').contains('Náhrdelník Mon Petit').click()
        cy.intercept({ path: '**/api/v1/**' }, (req) => {
            req.on('response', (res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.include.keys('data')
            })
        })
    });
    // змінити колір і перевірити, що ціна при цьому змінилася
    it('check price after color changing', () => {
        cy.get('.w-full').contains('Náhrdelník Mon Petit').click()
        cy.get('.conf-m8ht77-ml-2').invoke('text').then((price) => {
            cy.get('.swiper-slide-next > .conf-m8ht77-flex-col').click();
            cy.get('.conf-m8ht77-ml-2').invoke('text').then((new_price) => {
                expect(price).not.equal(new_price);
            })
        })
    });
})