var connection = require('../database/db')
const axios = require('axios')

const fetchdata = async (req,res) => {
    try {
        const fetcdata = await axios.get('https://roxiler-interviews.s3.amazonaws.com/product_transaction.json')
        
        var allData = fetcdata.data
        
        allData.forEach(element => {

            id = element.id
            title = element.title
            price = element.price
            description = element.description
            category = element.category
            image = element.image
            sold = element.sold
            
            dateofsale = new Date(element.dateOfSale)

            connection.query('insert into sales(id,title,price,description,category,image,sold,dateofsale) values(?,?,?,?,?,?,?,?)',[id,title,price,description,category,image,sold,dateofsale],(error,iresult) => {
                if(error) {
                   console.log(error)
                } 
            })



        })

        res.json('data inserted ')
        
       
    } catch(err) {
        res.json(err)
    }
}

const saleamount =  (req,res) => {
    var month = req.params.month;
    try {

        connection.query(`SELECT SUM(price)  saleamount  FROM sales WHERE sold=1 AND dateofsale LIKE '%-${month}-%'`,[month],(error,result) => {
            if(error) {
                res.status(500).json(error)
            } else {
                res.json(result)
            }
        })
    }
    catch(err) {
        res.status(500).json(err)
    }
}

const notsolditem =(req,res) => {
    var month = req.params.month;

    try {
        connection.query(`SELECT COUNT(*)  totalnotsolditem  FROM sales WHERE sold=0 AND dateofsale LIKE '%-${month}-%'`,[month],(error,result) => {
            if(error) {
                res.status(500).json(error)
            } else {
                res.json(result)
            }
        })
    } catch(err) {
        res.json(500).json(err)
    }
}

const solditem = (req,res) => {
    var month = req.params.month;

    try {
        connection.query(`SELECT COUNT(*)  totalsolditem  FROM sales WHERE sold=1 AND dateofsale LIKE '%-${month}-%'`,[month],(error,result) => {
            if(error) {
                res.status(500).json(error)
            } else {
                res.json(result)
            }
        })
    } catch(err) {
        res.status(500).json(err)
    }
}

const uniquecategories = (req,res) => {
    var month = req.params.month;
    try {
        connection.query(`SELECT category,COUNT(*) items FROM sales WHERE dateofsale LIKE '%-${month}-%'  GROUP BY category`,(error,result) => {
            if(error) {
                res.status(500).json(result)
            } else {
                res.json(result)
            }
        })
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = {
    fetchdata,
    saleamount,
    solditem,
    notsolditem,
    uniquecategories
}