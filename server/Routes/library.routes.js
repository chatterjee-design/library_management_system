import { Router } from "express";

const libraryRoute = Router()

libraryRoute.route('/').get( function(req, res){
    res.send("hii from library")
})

export default libraryRoute;