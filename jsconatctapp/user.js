const Contact = require("./contact")

class User {
    static allUser = []
    constructor(name, username, isAdmin) {
        this.name = name
        this.username = username
        this.isAdmin = isAdmin
        this.contacts = []
    }
    static findUser(username) {
        //type validation
        if (typeof username !== 'string') {
            throw new Error('Username must be a string.');
          }
        for (let index = 0; index < User.allUser.length; index++) {
            if (User.allUser[index].username == username) {
                return [true, index]
            }
        }
        return [false, -1]
    }
    findContact(cName) {
        for (let index = 0; index < this.contacts.length; index++) {
          if (this.contacts[index].cName === cName) {
            return [true, index];
          }
        }
        return [false, -1];
      }
      
    
    newContact(cName) {
        //check cname is string
        if (typeof cName !== 'string') {
            throw new Error('Contact name must be a string.');
          }
        //check not admin
        if (this.isAdmin){
            throw new Error("Admin Cannot Create Contacts")
        }
        let [isContactExist, indexOfContact] = this.findContact(cName)
        if (isContactExist) {
            throw new Error("Contact Doesnot Exist")
        }

        const newContact = Contact.newContact(cName)
        this.contacts.push(newContact)
        return newContact
    }

    static newAdmin(name, username) {
        //type validation - name -username
        if (typeof name !== 'string' || typeof username !== 'string') {
            throw new Error('Name and username must be strings.');
          }
          const [isUserExist, indexOfUserFound] = User.findUser(username);
          if (isUserExist) {
            throw new Error('Username already exists.');
          }
      
          const admin = new User(name, username, true);
          User.allUser.push(admin);
          return admin;
        }

        
    
    newUser(name, username) {
        //type validation - name -username
        if (typeof name !== 'string' || typeof username !== 'string') {
            throw new Error('Name and username must be strings.');
          }
        //check
        if (!this.isAdmin) {
            throw new Error("Unauthorized")
        }
        let [isUserExist, indexOfUserFound] = User.findUser(username)
        if (isUserExist) {
            throw new Error("Username Already Exist")
        }
        const user = new User(name, username, false)
        User.allUser.push(user)
        return user
    }
    getAllUser() {
        //type validation - name -username
        for (const user of User.allUser) {
            if (typeof user.name !== 'string' || typeof user.username !== 'string') {
              throw new Error('Name and username must be strings for all users.');
            }
          }
        //check
        if (!this.isAdmin) {
            throw new Error("Unauthorized")
        }
        return User.allUser
    }
    updateUser(username, parameter, newValue) {
        //type validation - parameter -username
        if (typeof username !== 'string') {
            throw new Error('Username must be a string.');
          }
          if (typeof parameter !== 'string') {
            throw new Error('Parameter must be a string.');
          }
        //check
        if (!this.isAdmin) {
            throw new Error("Unauthorized")
        }
        let [isUserExist, indexOfUserFound] = User.findUser(username)
        if (!isUserExist) {
            throw new Error("Username Does not Exist")
        }
        switch (parameter) {
            case "name": User.allUser[indexOfUserFound].updateName(newValue)
                break;
            case "username": User.allUser[indexOfUserFound].updateUsername(newValue)
                break;
            default:
                throw new Error("Invalid Parameter")

        }
    }
    updateName(newName) {
        //newName string check
        if (typeof newName !== 'string') {
            throw new Error('New name must be a string.');
        }
          this.name = newName;
    }


    updateUsername(newUsername) {
        let [isUserExist, indexOfUserFound] = User.findUser(newUsername)
        if (isUserExist) {
            throw new Error("Username Already Exists")
        }
        this.username = newUsername
    }
    deleteUser(username) {
        if (!this.isAdmin) {
            throw new Error("Unauthorized")
        }
        let [isUserExist, indexOfUserFound] = User.findUser(username)
        if (!isUserExist) {
            throw new Error("Username Does not Exist")
        }


        // User.allUser.slice()
        User.allUser.splice(indexOfUserFound, 1);
    }
}

module.exports = User