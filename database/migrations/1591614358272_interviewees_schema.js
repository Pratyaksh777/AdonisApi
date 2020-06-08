'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IntervieweesSchema extends Schema {
  up () {
    this.create('interviewees', (table) => {
      table.increments()
      table.timestamps()
      table.string('First_Name').notNullable()
      table.string('Last_Name').notNullable()
      table.date('DOB').notNullable()
      table.integer('Is_deleted').unsigned().notNullable().defaultTo(0)
      table.dateTime('deleted_at').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.dateTime('last_login').notNullable()

    })
  }

  down () {
    this.drop('interviewees')
  }
}

module.exports = IntervieweesSchema
