const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeviceSchema = new Schema({
  _id: { type: String, default: uuid.v4() },
  status: { type: Number, default: 1 }, // -1: 失效 1: 正常
  credential: { type: String, required: true },
  privateKey: String,
  cert: String,
  storageKey: String,
  signingKey: { type: String, required: true }
}, {
  timestamps: true,
})

DeviceSchema.index({ credential: 1 }, { unique: true })

module.exports = mongoose.model('Device', DeviceSchema)