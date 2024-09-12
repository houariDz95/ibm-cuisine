import mongoose from 'mongoose';
import { IFacture } from '@/types/facture.type';

const ItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  couleurExterieur: {
    type: String,
    required: true,
  },
  couleurInterieur: {
    type: String,
    required: true,
  },
  typeModeles: {
    type: String,
    required: true,
  },
  typeAccessoirs: {
    type: String,
    required: true,
  },
  hauteurDePleinte: {
    type: String,
    required: true,
  },
});

const VercementSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const FactureSchema = new mongoose.Schema({
  items: {
    type: [ItemSchema], // Updated items schema with new fields
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  vercement: {
    type: [VercementSchema],
    default: [],
  },
  phone: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  factureNumber: {
    type: Number,
    unique: true,
    default: 1,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

// Virtual fields to calculate totals
FactureSchema.virtual('total').get(function () {
  return this.items.reduce((acc, item) => acc + item.price, 0);
});

FactureSchema.virtual('totalVercement').get(function () {
  return this.vercement.reduce((acc, v) => acc + v.amount, 0);
});

// Ensure virtuals are included in toJSON and toObject outputs
FactureSchema.set('toJSON', { virtuals: true });
FactureSchema.set('toObject', { virtuals: true });

// Middleware to automatically set `isCompleted` and enforce totalVercement <= total
FactureSchema.pre<IFacture>('save', function (next) {
  const total = this.total;
  const totalVercement = this.totalVercement;

  if (totalVercement > total) {
    return next(new Error('Total vercement cannot exceed the total amount.'));
  }

  // Set isCompleted based on comparison between total and totalVercement
  this.isCompleted = Number(totalVercement) === Number(total) ? true : false;

  next();
});

FactureSchema.pre('save', async function (next) {
  const latestFacture = await mongoose.models.Facture.findOne().sort({ factureNumber: -1 });
  if (latestFacture) {
      this.factureNumber = latestFacture.factureNumber + 1;
  } else {
      this.factureNumber = 1;
  }
  next();
});

const Facture = mongoose.models.Facture || mongoose.model('Facture', FactureSchema);

export default Facture;


