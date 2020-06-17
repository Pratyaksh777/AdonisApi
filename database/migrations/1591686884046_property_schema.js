'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PropertySchema extends Schema {
  up() {
    this.create('properties', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 50).notNullable()
      table.string('location').notNullable()
      table.string('type', 15).notNullable().defaultTo('null')
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.text('description', 'mediumtext')
    })
  }

  down() {
    this.drop('properties')
  }
}

module.exports = PropertySchema
