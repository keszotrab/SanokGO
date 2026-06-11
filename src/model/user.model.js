export class User {
  constructor(username, email, password) {
    //this.id = crypto.randomUUID(); // Generuje unikalny identyfikator
    this.username = username;
    this.email = email.toLowerCase();
    this.password = password; //Tutaj powinien być hash hasła, ale to kwestia przepuszczenia przez funckje hashująca
    this.role = "user";
    this.createdAt = new Date();
    this.isActive = true;
    this.locations = [];
  }
}