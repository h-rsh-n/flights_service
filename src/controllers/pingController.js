const {StatusCodes} = require('http-status-codes');

const ping = (req,res)=>{
  return res.status(StatusCodes.OK).json({
    success:true,
    message:'API is live',
    data:{}
  })
}

module.exports = {
  ping
}