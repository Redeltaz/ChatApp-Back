"use strict";
class CreateUser {
    constructor(pseudo, mdp) {
        this.pseudo = pseudo,
            this.mdp = mdp;
    }
    static getPseudo() {
        let pseudo = document.getElementById("pseudo").value;
        return pseudo;
    }
    static getPassword() {
        let password = document.getElementById("mdp").value;
        return password;
    }
}
let start = document.getElementsByClassName("send")[0];
start.addEventListener("click", () => {
    let pseudo = CreateUser.getPseudo();
    let mdp = CreateUser.getPassword();
    const newUser = new CreateUser(pseudo, mdp);
    console.log(newUser);
});
