const express = require('express')
const router = express.Router()
const {body, validationResult } = require('express-validator')
const {register, login, fetchUser} = require('../controllers/userDataController');
const userAuthMiddleware = require('../middleware/userAuthMiddleware');

// /user/auth/register | POST
router.post('/register',[
    body('email').exists(),
    body('email').isEmail(),
    body('password').isLength({min : 6}),
    body('role',"specify the role").exists()
], async (req, res, next)=>{
    const user = req.body;
    const errors = validationResult(req)
    if(!errors.isEmpty()) res.json({
        message : "validation errors",
        errors : errors.array()
    })

    try {
        let registered = await register(user);
        res.status(200).send({
            success : true,
            data : registered
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Registration failed",
            errorMsg : error.message
        })
    }
})

router.post('/login',[
    body('email', "Email cannot be empty").exists(),
    body('email', "Enter valid email").isEmail(),
    body('password', "password length should be 6").isLength({min : 6})
] , async (req,res, next)=>{
    let errors = validationResult(req)
    if(!errors.isEmpty()) res.json({message : "validation errors", errors : errors.array()})
    
    let loginUser = req.body;
    try {
        const {token, user} = await login(loginUser)
        res.status(200).send({
            success : true,
            token,
            user
        })
    } catch (error) {
        res.status(400).send({
            success : false,
            message : "Login Failed",
            errorMsg : error.message
        })
    }
})

router.get('/fetchUser', userAuthMiddleware, async (req, res, next)=>{
    try {
        let userId = req.authData.id
        let foundUser = await fetchUser(userId)
        res.status(200).send({
            success : true,
            data : foundUser
        })
    } catch (error) {
        res.status(400).send({
            success : false,
            message : "Couldn't fetch user",
            errorMsg : error.message
        })
    }
})

module.exports = router;