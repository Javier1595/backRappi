const mainController = {};
 mainController.main = (req,res) =>{
     res.json({
         API: "Soy una API"
     });
 };

 module.exports = mainController;
