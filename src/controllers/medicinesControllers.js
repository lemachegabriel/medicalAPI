const mongoose = require('mongoose');
const medicines = mongoose.model('Medicines')

module.exports = {
    async index(req, res) {
        const data = await medicines.find();

        return res.json(data);
    },
    async show(req, res) {
        const data = await medicines.findById(req.params.id);

        return res.json(data)
    },
    async store(req, res) {
        const data = await medicines.create(req.body);

        return res.json(data);
    },
    async update(req, res) {
        const data = await medicines.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.json(data); 
    },
    async destroy(req, res) {
        await medicines.findByIdAndRemove(req.params.id);

        return res.send('excluido');
    },
    async likeQ(req, res){
        recivedData = req.body
        const data = await medicines.find({'name': {'$regex': `${recivedData["name"]}`}})

        return res.json(data)
    }
}