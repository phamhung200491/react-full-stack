import db from "../models/index"
import bcrypt from 'bcryptjs'

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                //user already exist

                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    console.log('>>> user ', user)
                    console.log('>>> password ', password)
                    console.log('>>> user.password ', user.password)
                    //compare password
                    let check = bcrypt.compareSync(password, user.password)
                    console.log('>>> check ', check)
                    //check = true
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'OK';
                        console.log('>>> user ', user)
                        delete user.password;
                        userData.user = user
                        console.log('>>> userData ', userData)
                    }
                    else {
                        userData.errCode = 3
                        userData.errMessage = 'Wrong password'
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = `User isn't not found~`
                }
            } else {
                //return error
                userData.errCode = 1
                userData.errMessage = `Your's Email isn't exist in your system. Plz try other email!`
            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
                raw: true
            })

            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin
}