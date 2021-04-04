import mongoose from 'mongoose';

const Product = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  marca:{
    type: String,
    required: true
  }, 
  categoria: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

export default mongoose.model('product', Product);