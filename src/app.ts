import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => { return user.email === email})
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }

    registerBike(bike: Bike): void {
        if(bike.id != null) {
            for (const rBike of this.bikes) {
                if (rBike.id === bike.id) {
                    throw new Error('Duplicate Bike.')
                }
            }
        }
        else{
            bike.id = crypto.randomUUID() 
        }
        this.bikes.push(bike)
    }
    removeUser(user: User): void {
        let index = this.users.indexOf(user)
        if(index) this.users.splice(index,1)
        else throw new Error('Usuário não encontrada.')
    }

    removeBike(bike: Bike): void {
        let index = this.bikes.indexOf(bike)
        if(index) this.bikes.splice(index,1)
        else  throw new Error('Bike não encontrada.')
    }

}