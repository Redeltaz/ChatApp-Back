interface User {
    pseudo: string;
    mdp: string;
}

class CreateUser implements User{
    pseudo: string;
    mdp: string;

    constructor(pseudo: string, mdp: string){
        this.pseudo = pseudo,
        this.mdp = mdp
    }

    static getPseudo(): string{
        let pseudo = (<HTMLInputElement>document.getElementById("pseudo")).value;
        return pseudo
    }

    static getPassword(): string{
        let password = (<HTMLInputElement>document.getElementById("mdp")).value;
        return password
    }
}

let start = document.getElementsByClassName("send")[0]

start.addEventListener("click", () => {
    let pseudo = CreateUser.getPseudo()
    let mdp = CreateUser.getPassword()
    const newUser = new CreateUser(pseudo, mdp)
    console.log(newUser)
})