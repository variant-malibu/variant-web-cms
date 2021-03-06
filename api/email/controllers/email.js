'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */


require('dotenv').config({ path: require('find-config')('.env') })
const sgMail = require('@sendgrid/mail');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  send: async (ctx) => {

    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      console.log("sendgrid api key:", process.env.SENDGRID_API_KEY)
      strapi.log.info('email/controllers/email.send ', ctx.request.body)
      const to = process.env.EMAIL_TO
      const {from, subject, html} = ctx.request.body
      const msg = {
        to,
        from,
        subject,
        html
      }
      const [Response] = await sgMail.send(msg)
      if (Response.statusCode > 100 && Response.statusCode < 300) {
        return 'Thank you for your submission! We will get back to you as soon as possible.'
      } else {
        return `Ooops. Your message has failed to devliver. Contact us at ${process.env.EMAIL_TO}`
      }
    } catch (err) {
      strapi.log.info(err)
      return `There was an error! ${process.env.SENDGRID_API_KEY} Contact us at ${process.env.EMAIL_TO}`
    }
  }
}
