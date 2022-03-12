const handleApp = (app, express)=>{
    app.use('/', express.static("./public"));

}

module.exports = {handleApp}