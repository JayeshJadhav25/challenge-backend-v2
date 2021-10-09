const express = require('express')
const router = express.Router()

const salesController = require('../controllers/salesController')

router.get('/fetchdata',salesController.fetchdata)

router.get('/saleamount/:month',salesController.saleamount)

router.get('/solditem/:month',salesController.solditem)

router.get('/notsolditem/:month',salesController.notsolditem)

router.get('/uniquecategories/:month',salesController.uniquecategories)

router.get('/barchart/:month',salesController.barchart)



module.exports = router