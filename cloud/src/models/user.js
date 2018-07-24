const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  _id: { type: String, default: uuid.v4() },
  status: { type: Number, default: 1 }, // -1: 失效 1: 正常
  nickName: String,
  avatarUrl: String,
  phoneNO: { type: String, required: true },
  password: { type: String, required: true },
  // ddaToken: { type: String, required: true },
  deivces: [{ type: String, ref: 'Device' }]
}, {
  timestamps: true,
})

UserSchema.index({ nickName: 1 })
UserSchema.index({ phoneNO: 1 }, { unique: true })

module.exports = mongoose.model('User', UserSchema)