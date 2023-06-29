

const User = require("./user");
const Contact = require("./contact");
const ContactInfo = require("./contact_info");

// Create an admin user
const adminUser = User.newAdmin("Vismita", "vismita");

// Create four regular users
const user1 = adminUser.newUser("John Doe", "john");
const user2 = adminUser.newUser("Jane Smith", "jane");
const user3 = adminUser.newUser("Bob Johnson", "bob");
const user4 = adminUser.newUser("Alice Brown", "alice");

const contact1 = new Contact("John Doe");

const contactInfo1 = new ContactInfo("Email", "john@example.com");

// Display all users (only accessible to admin)
try {
  const allUsers = adminUser.getAllUser();
  console.log("All Users:");
  console.log(allUsers);
} catch (error) {
  console.log("Error:", error.message);
}

// Update a user's name
try {
  adminUser.updateUser("jane", "name", "Jane Updated");
  console.log("User 2 updated name:", user2.name);
} catch (error) {
  console.log("Error:", error.message);
}

  

// Update a user's username
try {
  adminUser.updateUser("jane", "username", "jane_updated");
  console.log("User 2 updated username:", user2.username);
} catch (error) {
  console.log("Error:", error.message);
}




// Add contact info to a contact
try {
   contact1.addContactInfo(contactInfo1);
  console.log("Contact 1 added contact info:", contactInfo1);
} catch (error) {
  console.log("Error:", error.message);
}

// Update contact info
try {
    const contact1 = user1.newContact("John Doe");
    const contactInfo1 = contact1.addContactInfo("Email", "john@example.com");
    console.log("Contact info before update:", contact1.contactInfos);
    const updatedContactInfo = contact1.updateContactInfo(contactInfo1, "Email", "john1@example.com");
    console.log("Updated contact info:", updatedContactInfo);
  } catch (error) {
    console.log("Error:", error.message);
  }
  

// Delete a contact info
try {
  contact1.deleteContactInfo(contactInfo1);
  console.log("Contact info 1 deleted.",contactInfo1);
} catch (error) {
  console.log("Error:", error.message);
}

// Delete a user
try {
    const username = "john";
    adminUser.deleteUser(username);
    console.log("User deleted:", username);
  } catch (error) {
    console.log("Error:", error.message);
  }