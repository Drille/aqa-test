/// <reference types="cypress" />


describe('Part one of AQA test', () => {
  beforeEach(() => {
    cy.visit('/')
    // cy.get('.sticky').contains('ZÁSNUBY').click() //наразі веде на engagement-rings де немає філтрів, можливо був апдейт. 31.10 вело на collection/engagement
    cy.visit('collection/engagement')
  })

  //перейти у розділ "Zásnuby" через верхнє меню,
  //перевірити тіло і код респонсів, які отримуються при цьому з api
  it('check responses on page', () => {
    cy.intercept({ path: '**/api/v1/**' }, (req) => {
      req.on('response', (res) => {
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.include.keys('data', 'meta')
      })
    })
  });

  //перевірити які фільтри є в боковій панелі
  it('check filters in side panel', () => {
    cy.contains('.widget__title', 'Kolekcia').should('exist');
    cy.contains('.widget__title', 'Kategória').should('exist');
    cy.contains('.widget__title', 'Kovy').should('exist');
    cy.contains('.widget__title', 'Tvar Kameňov').should('exist');
    cy.contains('.widget__title', 'Kamene').should('exist');
    cy.contains('.widget__title', 'Štýly Hlavy Prsteňa').should('exist');
    // cy.get('.desktop_filters > :nth-child(1) > :nth-child(1) > .widget__title').should('exist');
    // cy.get(':nth-child(2) > .filter-title > .widget__title').should('exist');
    // cy.get(':nth-child(3) > :nth-child(3) > .filter-title > .widget__title').should('exist');
    // cy.get(':nth-child(3) > :nth-child(4) > .filter-title > .widget__title').should('exist');
    // cy.get(':nth-child(3) > :nth-child(5) > .filter-title').should('exist');
    // cy.get(':nth-child(3) > :nth-child(6) > .filter-title > .widget__title').should('exist');
  });

  //перевірити які значення є у фільтрів у боковій панелі за замовчуванням
  it('check filter values by default', () => {
    cy.contains('.widget__collections', 'Kolekcia Omara Cuff').should('exist');
    cy.contains('.widget__collections', 'Stohovateľné prstene').should('exist');
    cy.contains('.widget__collections', 'Fashion').should('exist');

    cy.get('input[type="checkbox"][value=NARAMKY]').should('exist')
    cy.contains(':nth-child(2) > .widget__collections', 'Náramky').should('exist');
    cy.get('input[type="checkbox"][value=PRSTENE]').should('exist')
    cy.contains(':nth-child(2) > .widget__collections', 'Prstene').should('exist');
    cy.get('input[type="checkbox"][value=NAHRDELNIKY]').should('exist')
    cy.contains(':nth-child(2) > .widget__collections', 'Náhrdelníky').should('exist');

    cy.get('input[type="checkbox"][value=10KY]').should('exist')
    cy.contains(':nth-child(3) > .widget__collections', '417 Žlté Zlato (10K)').should('exist');
    cy.get('input[type="checkbox"][value=10KW]').should('exist')
    cy.contains(':nth-child(3) > .widget__collections', '417 Biele Zlato (10K)').should('exist');
    cy.get('input[type="checkbox"][value=10KR]').should('exist')
    cy.contains(':nth-child(3) > .widget__collections', '417 Ružové Zlato (10K)').should('exist');

    cy.get('input[type="checkbox"][value=MQ]').should('exist')
    cy.contains(':nth-child(4) > .widget__collections', 'Markíza').should('exist');
    cy.get('input[type="checkbox"][value=PE]').should('exist')
    cy.contains(':nth-child(4) > .widget__collections', 'Hruška').should('exist');
    cy.get('input[type="checkbox"][value=EM]').should('exist')
    cy.contains(':nth-child(4) > .widget__collections', 'Smaragd').should('exist');

    cy.get('input[type="checkbox"][value=DMND]').should('exist')
    cy.contains(':nth-child(5) > .widget__collections', 'Diamant').should('exist');
    cy.get('input[type="checkbox"][value=SPHR]').should('exist')
    cy.contains(':nth-child(5) > .widget__collections', 'Zafír').should('exist');

    cy.get('input[type="checkbox"][value=DHALO]').should('exist')
    cy.contains(':nth-child(6) > .widget__collections', 'Dvojité Halo').should('exist');
    cy.get('input[type="checkbox"][value=3STHALO]').should('exist')
    cy.contains(':nth-child(6) > .widget__collections', 'Trojkamenný Center Halo').should('exist');
    cy.get('input[type="checkbox"][value=3ST]').should('exist')
    cy.contains(':nth-child(6) > .widget__collections', 'Trojkamenný').should('exist');
  })

  //розгорнути кожен і перевірити які значення є після цього
  it('check filter values after each open', () => {
      cy.get('.desktop_filters button').each(($btn => {
        cy.wrap($btn).click();
      }))

      cy.contains('.widget__collections', 'Shades').should('exist');
      cy.contains('.widget__collections', 'Klasická kolekcia').should('exist');
      cy.contains('.widget__collections', 'Gravírovateľné šperky').should('exist');
      cy.contains('.widget__collections', 'Kúzlo Náhrdelníky').should('exist');
      cy.contains('.widget__collections', 'Block Charm').should('exist');
      cy.contains('.widget__collections', 'Zásnubné Prstene').should('exist');
      cy.contains('.widget__collections', 'Birthstones').should('exist');
      cy.contains('.widget__collections', 'Mix&Match Charms').should('exist');
      cy.contains('.widget__collections', 'Súradnice').should('exist');
      cy.contains('.widget__collections', 'Kolekcia Initial').should('exist');
      cy.contains('.widget__collections', 'Najpredávanejšie Darčeky').should('exist');
      cy.contains('.widget__collections', 'Vianoce').should('exist');
      cy.contains('.widget__collections', 'Darčeky do 1000 €').should('exist');
      cy.contains('.widget__collections', 'Darčeky do 500 €').should('exist');
      cy.contains('.widget__collections', 'Diamantové Cuffs').should('exist');
      cy.contains('.widget__collections', 'Diamantové Prstene').should('exist');
      cy.contains('.widget__collections', 'Diamantové Náhrdelníky').should('exist');
      cy.contains('.widget__collections', 'Diamantové Náramky').should('exist');

      cy.get('input[type="checkbox"][value=NAUSNICE]').should('exist')
      cy.contains(':nth-child(2) > .widget__collections', 'Náušnice').should('exist');
      cy.get('input[type="checkbox"][value=PRIVESKY]').should('exist')
      cy.contains(':nth-child(2) > .widget__collections', 'Prívesky').should('exist');
      cy.get('input[type="checkbox"][value=NARAMKY-NA-NOHU]').should('exist')
      cy.contains(':nth-child(2) > .widget__collections', 'Náramky na nohu').should('exist');

      cy.get('input[type="checkbox"][value=14KY]').should('exist')
      cy.contains(':nth-child(3) > .widget__collections', '585 Žlté Zlato (14K)').should('exist');
      cy.get('input[type="checkbox"][value=14KW]').should('exist')
      cy.contains(':nth-child(3) > .widget__collections', '585 Biele Zlato (14K)').should('exist');
      cy.get('input[type="checkbox"][value=14KR]').should('exist')
      cy.contains(':nth-child(3) > .widget__collections', '585 Ružové Zlato (14K)').should('exist');
      cy.get('input[type="checkbox"][value=18KY]').should('exist')
      cy.contains(':nth-child(3) > .widget__collections', '750 Žlté Zlato (18K)').should('exist');
      cy.get('input[type="checkbox"][value=18KW]').should('exist')
      cy.contains(':nth-child(3) > .widget__collections', '750 Biele Zlato (18K)').should('exist');
      cy.get('input[type="checkbox"][value=18KR]').should('exist')
      cy.contains(':nth-child(3) > .widget__collections', '750 Ružové Zlato (18K)').should('exist');
      cy.get('input[type="checkbox"][value=PT]').should('exist')
      cy.contains(':nth-child(3) > .widget__collections', '950 Platina').should('exist');

      cy.get('input[type="checkbox"][value=OV]').should('exist')
      cy.contains(':nth-child(4) > .widget__collections', 'Oválny').should('exist');
      cy.get('input[type="checkbox"][value=CU]').should('exist')
      cy.contains(':nth-child(4) > .widget__collections', 'Vankúšikový').should('exist');
      cy.get('input[type="checkbox"][value=PR]').should('exist')
      cy.contains(':nth-child(4) > .widget__collections', 'Princezná').should('exist');
      cy.get('input[type="checkbox"][value=RD]').should('exist')
      cy.contains(':nth-child(4) > .widget__collections', 'Okrúhly').should('exist');

      cy.get('input[type="checkbox"][value=HBZL]').should('exist')
      cy.contains(':nth-child(6) > .widget__collections', 'Bezel Polovičný').should('exist');
      cy.get('input[type="checkbox"][value=BZL]').should('exist')
      cy.contains(':nth-child(6) > .widget__collections', 'Bezel Plný').should('exist');
      cy.get('input[type="checkbox"][value=6PR]').should('exist')
      cy.contains(':nth-child(6) > .widget__collections', '6-Prong').should('exist');
      cy.get('input[type="checkbox"][value=4PR]').should('exist')
      cy.contains(':nth-child(6) > .widget__collections', '4-Prong').should('exist');
      cy.get('input[type="checkbox"][value=BEADHALO]').should('exist')
      cy.contains(':nth-child(6) > .widget__collections', 'Bead Single Halo Malý').should('exist');
      cy.get('input[type="checkbox"][value=UPAVE]').should('exist')
      cy.contains(':nth-child(6) > .widget__collections', 'U-Páve Single Halo Malý').should('exist');
      cy.get('input[type="checkbox"][value=BEADHALOB]').should('exist')
      cy.contains(':nth-child(6) > .widget__collections', 'Bead Single Halo Veľký').should('exist');
      cy.get('input[type="checkbox"][value=UPAVEHALOB]').should('exist')
      cy.contains(':nth-child(6) > .widget__collections', 'U-Páve Single Halo Veľký').should('exist');
    })
})
