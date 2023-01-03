module.exports = (schema) => {
    return async(request, response, next) => {
        try{
            await schema.validateAsync(request.body)
            next()
        }catch (e){
            response.send(e.message)
        }
    }
}