'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.timestamps()
      table.string('resume')
      table.string('firstName')
      table.string('lastName')
      table.string('email')
      table.string('mobile_number')
      table.string('state')
      table.string('city')
      table.string('jobTitle')
      table.string('compName')
      table.string('industry')
      table.string('compLocation')
      table.string('schoolName')
      table.string('studyField')
      table.string('degree')
      table.string('skills')
      table.string('interests')
      table.integer('interviewee_id').unsigned()
      table.foreign('interviewee_id').references('interviewees.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
