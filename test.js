const test = require('tape'),
      { Movie, Person } = require('./index')

test('0 tickets == $0.00', t => {
  const movie = new Movie({ duration: 90, day: 0 }) // Sunday
  const cost = movie.tickets([])
  t.equal(cost, 0)
  t.end()
})

test('4 x 35 year-olds, 2D, 90 minute duration, Tuesday, normal seating == $44.00', t => {
  const group = (new Array(4)).fill( new Person({ age: 35 }) )
  const movie = new Movie({ duration: 90, day: 2 })
  const cost = movie.tickets(group)
  t.equal(cost, 44)
  t.end()
})

test('4 x 35 year-olds, 3D, 90 minute duration, Tuesday, normal seating == $56.00', t => {
  const group = (new Array(4)).fill( new Person({ age: 35 }) )
  const movie = new Movie({ duration: 90, threeD: true, day: 2 })
  const cost = movie.tickets(group)
  t.equal(cost, 56)
  t.end()
})

test('21 x 35 year-old, 2D, 90 minute duration, Tuesday, normal seating == $126.00', t => {
  const group = (new Array(21)).fill( new Person({ age: 35 }) )
  const movie = new Movie({ duration: 90, day: 2 })
  const cost = movie.tickets(group)
  t.equal(cost, 126)
  t.end()
})

test('4 x 35 year-olds, 3D, 90 minute duration, Tuesday, balcony seating == $64.00', t => {
  const group = (new Array(4)).fill( new Person({ age: 35 }) )
  const movie = new Movie({ duration: 90, threeD: true, day: 2, balcony: true })
  const cost = movie.tickets(group)
  t.equal(cost, 64)
  t.end()
})

test('4 x 35 year-olds, 3D, 90 minute duration, Thursday, balcony seating == $56.00', t => {
  const group = (new Array(4)).fill( new Person({ age: 35 }) )
  const movie = new Movie({ duration: 90, threeD: true, day: 4, balcony: true })
  const cost = movie.tickets(group)
  t.equal(cost, 56)
  t.end()
})

test('4 x 35 year-olds, 2D, 240 minute duration, Monday, normal seating == $50.00', t => {
  const group = (new Array(4)).fill( new Person({ age: 35 }) )
  const movie = new Movie({ duration: 240, day: 1 })
  const cost = movie.tickets(group)
  t.equal(cost, 50)
  t.end()
})

test('4 x 35 year-olds, 3D, 90 minute duration, Saturday, balcony seating == $70.00', t => {
  const group = (new Array(4)).fill( new Person({ age: 35 }) )
  const movie = new Movie({ duration: 90, threeD: true, day: 6, balcony: true })
  const cost = movie.tickets(group)
  t.equal(cost, 70)
  t.end()
})

test('4 x 9 year-olds, 2D, 90 minute duration, Monday, normal seating == $22.00', t => {
  const group = (new Array(4)).fill( new Person({ age: 9 }) )
  const movie = new Movie({ duration: 90, day: 1 })
  const cost = movie.tickets(group)
  t.equal(cost, 22)
  t.end()
})

test('4 x 67 year-olds, 2D, 90 minute duration, Monday, normal seating == $24.00', t => {
  const group = (new Array(4)).fill( new Person({ age: 67 }) )
  const movie = new Movie({ duration: 90, day: 1 })
  const cost = movie.tickets(group)
  t.equal(cost, 24)
  t.end()
})

test('4 x 14 year-old students, 2D, 90 minute duration, Monday, normal seating == $32.00', t => {
  const group = (new Array(4)).fill( new Person({ age: 14, student: true }) )
  const movie = new Movie({ duration: 90, day: 1 })
  const cost = movie.tickets(group)
  t.equal(cost, 32)
  t.end()
})

test('1 x each type (student, regular, senior, child), 2D, 90 minute duration, Monday, normal seating == $30.50', t => {
  const group =[
    new Person({ age: 14, student: true }),
    new Person({ age: 20 }),
    new Person({ age: 65 }),
    new Person({ age: 9 })
  ]
  const movie = new Movie({ duration: 90, day: 1 })
  const cost = movie.tickets(group)
  t.equal(cost, 30.5)
  t.end()
})

test('21 x 9 year-olds, 2D, 90 minute duration, Monday, normal seating == $115.50', t => {
  const group = (new Array(21)).fill( new Person({ age: 9 }) )
  const movie = new Movie({ duration: 90, day: 1 })
  const cost = movie.tickets(group)
  t.equal(cost, 115.5)
  t.end()
})

test('21 x 35 year-old, 2D, 90 minute duration, Thursday, normal seating == $126.00', t => {
  const group = (new Array(21)).fill( new Person({ age: 35 }) )
  const movie = new Movie({ duration: 90, day: 4 })
  const cost = movie.tickets(group)
  t.equal(cost, 126)
  t.end()
})

test('10 x 14 year-old students + 11 x 9 year-olds, 2D, 90 minute duration, Monday, normal seating == $120.50', t => {
  const students = (new Array(10)).fill( new Person({ age: 14, student: true }) )
  const nineYearOlds = (new Array(11)).fill( new Person({ age: 9 }) )
  const group = [...students, ...nineYearOlds]
  const movie = new Movie({ duration: 90, day: 1 })
  const cost = movie.tickets(group)
  t.equal(cost, 120.5)
  t.end()
})

test('7 x each type (student, regular, senior, child), 3D, 240 minute duration, Thursday, balcony seating == $346.50', t => {
  const students = (new Array(7)).fill( new Person({ age: 14, student: true }) )
  const regularDegularSchmegulars = (new Array(7)).fill( new Person({ age: 20 }) )
  const seniors = (new Array(7)).fill( new Person({ age: 65 }) )
  const children = (new Array(7)).fill( new Person({ age: 9 }) )
  const group = [...students, ...regularDegularSchmegulars, ...seniors, ...children]
  const movie = new Movie({ duration: 240, threeD: true, day: 4, balcony: true })
  const cost = movie.tickets(group)
  t.equal(cost, 346.5)
  t.end()
})
