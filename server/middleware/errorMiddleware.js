const handleError = (err, req, res)=>{
    res.status(err.statusCode || 500).send({
        message : err.message || 'somthing went wrong!',
        statusCode : err.statusCode || 500,
        code : err.code || 'SOMETHING_WENT_WRONG' 
    })
}

module.exports = handleError;