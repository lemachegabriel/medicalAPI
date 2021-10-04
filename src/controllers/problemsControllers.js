const mongoose = require('mongoose')
const Problems = mongoose.model('Problem')

module.exports = {
    async create(req, res){
        const data = await Problems.create(req.body)
        return res.json(data)
    },
    async addMed(req, res){
        const {name, _id, problemId} = req.body
        const postData = {"$push": {"medicines": [{"name" : name, "_id" : _id}]}}
        const data = await Problems.findOneAndUpdate({"_id": problemId}, postData, {new:true})
        return res.json(data)
    },
    async delMed(req, res){
        const {_id, problemId} = req.body
        const postData = {"$pull" : {"medicines" :{"_id" : _id}}}
        const data = await Problems.findOneAndUpdate({"_id": problemId}, postData, {new:true})
        return res.json(data)
    }, 
    async index(req, res){
        const data = await Problems.find()
        return res.json(data)
    }, 
    async likeQ(req, res){
        recivedData = req.body
        const data = await Problems.find({'name': {'$regex': `${recivedData["name"]}`}})

        return res.json(data)
    }
}