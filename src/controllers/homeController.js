import db from '../models/index'
import CRUDService from "../services/CRUDService"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        })
    }
    catch (e) {
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)

    let allUser = await CRUDService.getAllUser()
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let data = await CRUDService.getUserInfoById(userId)

        console.log(data)
        return res.render('editCRUD.ejs', {
            dataTable: data
        })
    }
    else {
        return res.send('hello from edit page')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUser = await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        let allUser = await CRUDService.deleteUserById(id)
        return res.render('displayCRUD.ejs', {
            dataTable: allUser
        })
    }
    else {
        return res.send('hello from delete page')
    }
}

// object: {
// key: '',
// value: '',
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}