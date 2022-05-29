import signupPage from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Signup', () => {

  // before(()=>{
  //   cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
  // })

  // beforeEach(()=>{
  //   cy.log('Tudo aqui é executado sempre ANTES de CADA caso de testes')
  // })

  // after(()=>{
  //   cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
  // })

  // afterEach(()=>{
  //   cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de testes')
  // })

  // beforeEach(function() {
  //   cy.fixture('deliver').then((massa_deliver)=> {
  //     this.deliver = massa_deliver
  //   })
  // signupPage.fillForm(this.deliver.signup)
  // signupPage.fillForm(this.deliver.email_invalid)
  // signupPage.fillForm(this.deliver.cpf_invalid)

  // })

  it('User should be deliver', function () {
    var deliver = signupFactory.deliver()

    signupPage.go()
    signupPage.fillForm(deliver)
    signupPage.submit()

    const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
    signupPage.modalContentShouldBe(expectedMessage)
  })

  it('Invalid document', function () {
    var deliver = signupFactory.deliver()
    deliver.cpf = 'A564557278X'

    signupPage.go()
    signupPage.fillForm(deliver)
    signupPage.submit()
    signupPage.alertMessageShouldBe('Oops! CPF inválido')
  })


  it('Invalid Email', function () {
    var deliver = signupFactory.deliver()
    deliver.email = 'invalido.hotmail.com'

    signupPage.go()
    signupPage.fillForm(deliver)
    signupPage.submit()
    signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
  })

  context('Required fields', function () {
    const messages = [
      { field: 'name', output: 'É necessário informar o nome' },
      { field: 'cpf', output: 'É necessário informar o CPF' },
      { field: 'email', output: 'É necessário informar o email' },
      { field: 'postalCode', output: 'É necessário informar o CEP' },
      { field: 'number', output: 'É necessário informar o número do endereço' },
      { field: 'delivery_method', output: 'Selecione o método de entrega' },
      { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
    ]

    before(function(){
      signupPage.go()
      signupPage.submit()
    })

    messages.forEach(function(msg){
      it(`${msg.field} is required`, function() {
        signupPage.alertMessageShouldBe(`${msg.output}`)
      })
    })
  })
})