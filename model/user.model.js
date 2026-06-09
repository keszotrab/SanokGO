class User {
  constructor(username, email, password) {
    //this.id = crypto.randomUUID(); // Generuje unikalny identyfikator
    this.username = username;
    this.email = email.toLowerCase();
    this.password = password; //Tutaj powinien być hash hasła TODO
    this.role = "user";
    this.createdAt = new Date();
    this.isActive = true;
  }

  getPublicProfile() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role,
      memberSince: this.createdAt.toLocaleDateString(),
    };
  }

  updateUsername(newUsername) {
    if (newUsername && newUsername.length > 4) {
      this.username = newUsername;
    } else {
      throw new Error("Username must be at least 5 characters long.");
    }
  }

  updatePassword() {
    return;
  }
}