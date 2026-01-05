import doctorService from "../services/doctorService"

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit
    if (!limit) limit = 10
    try {
        let users = await doctorService.getTopDoctorHome(+limit)

        //let users = response

        console.log('check users topdoctor ', users)
        // convert image buffer -> base64 (nếu cần)
        let userData = users.data

        console.log('check user data topdoctor ', userData)

        if (userData && Array.isArray(userData)) {
            userData = userData.map(user => ({
                ...user,
                image: user.image ? user.image.toString('base64') : null,
            }))

            users.data = userData
        }
        console.log('check user data image topdoctor ', userData)
        console.log('check users image topdoctor ', users)

        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome
}