class Movie {
  constructor({ duration, day, threeD, balcony }) {
    this.duration = duration
    this.day = day
    this.threeD = threeD || false
    this.balcony = balcony || false
  }

  tickets(group) {
    return group.map(this._price.bind(this)).reduce( (a, b) => a + b, 0)
  }

  _price(person, index, group) {
    let cost = this._priceByPerson(person) || 11

    cost = this._priceByGroup(group, cost)

    cost = this._priceModifiers(group, cost)

    return cost
  }

  _priceByPerson(person) {
    if (person.age < 13) return 5.5
    if (person.student && (person.age >= 13 && person.age < 64)) return 8
    if (person.age >= 65) return 6
  }

  _priceByGroup(group, cost) {
    if (group.length < 20) return cost
    return (cost > 6) ? 6 : cost
  }

  _priceModifiers(group, cost) {
    if (this.threeD) cost += 3
    if (this.balcony) cost += 2
    if (this.day === 4 && group.length < 20) cost -= 2 // also group size
    if (this.duration > 120) cost += 1.5
    if (this.day === 5 || this.day === 6)  cost += 1.5
    return cost
  }

}

class Person {
  constructor({ age, student = false }) {
    this.age = age
    this.student = student
  }
}

module.exports = {
  Movie,
  Person
}
