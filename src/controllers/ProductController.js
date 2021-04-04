import Product from "../models/Product.js";

class ProductController {
    async list(req, res) {
        return res.json({
            message: "Listar produtos"
        });
    }
    async listOne(req, res) {
        return res.json({
            message: "Listar um produto"
        });
    }
    async create(req, res) {
        return res.json({
            message: "Criar um produto"
        });
    }
    async update(req, res) {
        return res.json({
            message: "Atualizar um produto"
        });
    }
    async delete(req, res) {
        return res.json({
            message: "Deletar um produto"
        });
    }
}

export default new ProductController();