import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike('mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, [])
const bike2 = new Bike('mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, [])
const user = new User('Maria', 'maria@mail.com', '1234')
const today = new Date()
const twoDaysFromToday = new Date()
const twoDaysBefore = new Date()
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
twoDaysBefore.setDate(twoDaysBefore.getDate() - 2)

const app = new App()
app.registerBike(bike)
app.registerBike(bike2)
app.registerUser(user)
app.rentBike(bike2,user, today, twoDaysFromToday)
app.rentBike(bike,user, twoDaysBefore, twoDaysBefore)
app.returnBike(bike2)
app.returnBike(bike)
