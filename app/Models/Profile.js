'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {
    interviewee() {
        return this.belongsTo('App/Models/Interviewee')
    }
}

module.exports = Profile
