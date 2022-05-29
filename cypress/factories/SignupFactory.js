var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {
  deliver: function() {

    var firstName = faker.name.firstName()
    var lastName = faker.name.lastName()

    var data = {
      name: `${firstName} ${lastName}`,
      cpf: cpf.generate(),
      email: faker.internet.email(firstName),
      whatsapp: '11999999999',
      address: {
        postal_code: '88101280',
        street: 'Rua Vereador Mário Coelho Pires',
        number: '200',
        details: 'ap 1000',
        district: 'Campinas',
        city_state: 'São José/SC'
      },
      delivery_method: 'Moto',
      cnh: 'images/cnh-digital.jpg'
    }
    return data
  }
}