const mongoose = require('mongoose');
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require("dotenv").config();

module.exports = {
    async index(req, res) {
        const user = await User.find();

        return res.json(user);
    },
    async verifyJWT(req, res){
        console.log('fasfafsasfafsafsasfasfasfafsafsa')
        console.log(req.cookies)
        console.log(req.cookies.authtoken)
        const token = req.cookies.authtoken
        if (!token) 
            return res.status(200).send({ auth: false, message: 'Token não informado.'})
            
        jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => { 
            if (err) 
                return res.status(200).send({ auth: false, message: 'Token inválido.' });
            req.UserId = decoded.id
        })
        const ID = req.UserId
        const user = await User.findById(ID).exec()
        res.status(200).send({auth: true, user})
    },
    async auth(req, res) {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select('+password')

        if(!user){
            return res.status(400).send({error: "Usuario não encontrado"})
        }
        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error: "Senha invalida"})
        }
        user.password = undefined
        const token = jwt.sign({id: user.id}, process.env.AUTH_KEY, {
            expiresIn: 24 * 60 * 60 * 100
        })

        res.status(202).cookie("authtoken", token, {
            sameSite: 'strict',
            secure: true,
			path: '/',
			expires: new Date(Date.now() + 24 * 60 * 60 * 10),
            httpOnly: true,
        }).send({user, token})

    },
    async store(req, res) {
        const {name, email} = req.body;
        try{
            if(await User.findOne({email})){
                return res.status(400).send({ error: "Email ja existe" })
            }
            // if(await User.findOne({name})){
            //     return res.status(400).send({ error: "Nome de usuario ja existe" })
            // }

            const user = await User.create(req.body);

            const token = jwt.sign({id: user.id}, process.env.AUTH_KEY, {
                expiresIn: 86400
            })
            
            res.status(202).cookie("authtoken", token, {
                //sameSite: 'strict',
                secure: true,
                path: '/',
                expires: new Date(Date.now() + 24 * 60 * 60 * 10),
                httpOnly: true,
            }).send({user, token})

        }catch(err){
            return res.status(400).send({error: "Registro falho"})
        }
        
    },
    async logout(req, res) {
        res.status(200).clearCookie("authtoken").send("logout")
    },
    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.json(user); 
    },
    async destroy(req, res) {
        await User.findByIdAndRemove(req.params.id);

        return res.send('excluido');
    }, 
    async addFav(req, res){
        const {name, _id, userId} = req.body
        const postData = {"$push": {"favorites": [{"name" : name, "_id" : _id}]}}
        const data = await User.findOneAndUpdate({'_id': userId}, postData, {new: true})
        return res.json(data)
    }
}