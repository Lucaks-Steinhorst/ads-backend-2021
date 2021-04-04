
//const User = require("../models/User");
import * as Yup from 'yup';
import Product from "../models/Product.js";

class ProductController {

    async list(req, res) {
        // consultar no banco os usuários
        Product.find({}).select("-nome").then((produtos) => {
            return res.json({
                error: false,
                product: product
            });
        }).catch(() => {
            return res.status(400).json({
                error: true,
                code: 100,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
        }

    async listOne(req, res) {
        Product.findOne({ _id: req.params.id }, '_id nome marca categoria createAt updateAt').then((produtos) => {
            return res.json({
                error: false,
                product: product
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 110,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })
    }

    async create(req, res) {
        // Validação com Yup
        const schema = Yup.object().shape({
            nome: Yup.string()
                .required(),
            marca: Yup.string()
                .required(),
            categoria: Yup.string()
                .required()
        });
        try {
            await schema.validate(req.body);
        } catch(err) {
            return res.status(400).json({
                error: true,
                code: 120,
                message: err.message
            });
        }
        
        Product.create(req.body).then((product) => {
            return res.json(product);
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 122,
                message: "Error: Produto não foi cadastrado com sucesso"
            });
        });
    }
    async update(req, res) {
        // Validação com Yup
        const schema = Yup.object().shape({
            _id: Yup.string()
                  .required()
                  .notOneOf(['']),
            nome: Yup.string()
                .notOneOf(['']),
            marca: Yup.string()
                .notOneOf(['']),
            categoria: Yup.string()
                .notOneOf([''])
        });
        try {
            await schema.validate(req.body);
        } catch(err) {
            return res.status(400).json({
                error: true,
                code: 130,
                message: err.message
            });
        }
        
        const ProductExiste = await Product.findOne({_id: req.params.id});

        if(!ProductExiste){
            return res.status(400).json({
                error: true,
                code: 131,
                message: "Erro: Produto não encontrado!"
            });
        };

        Product.updateOne({_id: req.params.id}, req.body).then(() => {
            return res.json({
                error: false,
                message: "Produto editado com sucesso!"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 133,
                message: "Erro: Produto não foi editado com sucesso!"
            });
        });
    }

    async delete(req, res) {
        Product.deleteOne({ _id: req.params.id }).then(() => {
            return res.json({
                error: false,
                message: "Produto apagado com sucesso!"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 140,
                message: "Error: Produto não foi apagado com sucesso."
            });
        });
    }
}

export default new ProductController();