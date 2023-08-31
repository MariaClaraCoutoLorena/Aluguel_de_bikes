import { Bike } from './bike';
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto';

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
        console.log("User cadastrado com sucesso!")
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
        console.log("Bike cadastrada com sucesso!")
    }
    removeUser(user: User): void {
        let index = this.users.indexOf(user)
        if(index!=undefined) this.users.splice(index,1)
        else throw new Error('Usuário não encontrada.')
        console.log("User retirado do sistema!")
    }

    removeBike(bike: Bike): void {
        let index = this.bikes.indexOf(bike)
        if(index!=undefined) this.bikes.splice(index,1)
        else  throw new Error('Bike não encontrada.')
        console.log("Bike retirada do sistema!")
    }

    rentBike(bike: Bike, user: User ,startDate: Date, endDate: Date): void{
        let rents_bike = this.rents.filter(rent => {rent.bike == bike})
        let new_rent = Rent.create(rents_bike, bike, user, startDate, endDate )
        this.rents.push(new_rent)
        console.log("Bike reservada! :)")
    }

    returnBike(bike: Bike): void{
        let index = this.bikes.indexOf(bike)
        if(index==undefined) throw new Error('Bike não encontrada.')
        let rent_bike = undefined; 
        for(let i =0; i< this.rents.length;i++){
            if(this.rents[i].bike == bike && this.rents[i].dateReturned==undefined) rent_bike = this.rents[i]
        }
        if(rent_bike){
            rent_bike.dateReturned = new Date()
            console.log("Bike entregue com sucesso" + (rent_bike.dateReturned>rent_bike.dateTo? ", mas tome cuidado para não atrasar de novo!": "!") )
        } else throw new Error('Essa bike não estava reservada.')
    }

}