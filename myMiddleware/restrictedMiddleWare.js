module.exports = function routePrefixCheck (req, res, next) {

    if(req.baseUrl === '/api/restricted'){
        console.log('%%% resticted route !!!!!\n');
        next();
    } else {
        res.status(451).json({
            message: `You cannot get here CAUSE its restricted !!`
        })
    }
    
}