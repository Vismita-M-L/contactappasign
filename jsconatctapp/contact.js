const ContactInfo = require('./contact_info');
class Contact {
    constructor(cName) {
      this.cName = cName;
      this.contactInfos = [];
    }
  
    static newContact(cName) {
      if (typeof cName !== 'string') {
        throw new Error('Contact name must be a string.');
      }
      return new Contact(cName);
    }
  
    addContactInfo(type, value) {
      const contactInfo = new ContactInfo(type, value);
      this.contactInfos.push(contactInfo);
      return contactInfo;
    }
  
    deleteContactInfo(contactInfo) {
      const index = this.contactInfos.indexOf(contactInfo);
      if (index !== -1) {
        this.contactInfos.splice(index, 1);
      }
    }
    updateContactInfo(contactInfo, newType, newValue) {
        // Type validation
        if (typeof newType !== 'string' || typeof newValue !== 'string') {
          throw new Error('New type and new value must be strings.');
        }
    
        const index = this.contactInfos.indexOf(contactInfo);
        if (index !== -1) {
          contactInfo.type = newType;
          contactInfo.value = newValue;
          return contactInfo;
        }
        throw new Error('Contact info not found.');
      }
  }
  
  module.exports = Contact;
  