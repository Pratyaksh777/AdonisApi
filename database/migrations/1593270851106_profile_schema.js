'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.timestamps()
      table.string('firstName').notNullable()
      table.string('lastName').notNullable()
      table.string('email').notNullable()
      table.string('state').notNullable()
      table.string('city').notNullable()
      table.string('jobTitle').notNullable()
      table.string('compName').notNullable()
      table.string('industry').notNullable()
      table.string('compLocation').notNullable()
      table.string('schoolName').notNullable()
      table.string('studyField').notNullable()
      table.string('degree').notNullable()
      table.string('skills').notNullable()
      table.string('interests').notNullable()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
