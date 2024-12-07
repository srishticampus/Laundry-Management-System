const Order = require('../models/orderModel');
const orderServiceModel = require('../models/orderServiceModel');



const addOrder = async (req, res) => {
    try {
        const {      
            totalAmount,
            shopId,
            custId,
            } = req.body;

        const newwData = new Order({
           
            totalAmount,
            shopId,
            custId,
            date:new Date()
        });
       
       
        await newwData.save()
            .then(data => {
                return res.json({
                    status: 200,
                    msg: "Inserted successfully",
                    data: data
                });
            })
            .catch(err => {
                console.log(err);
                return res.json({
                    status: 500,
                    msg: "Data not Inserted",
                    data: err
                });
            });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: error.message });
    }
};

const viewOrderById = (req, res) => {
    console.log(req.params.id);
    
    Order.findById({_id:req.params.id})
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};
const viewOrderByName = (req, res) => {
    console.log(req.params.id);
    
    Order.findOne({name:req.params.id})
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};
const editOrderById =async (req, res) => {
    const {      
        totalAmount,
    
        } = req.body;
        const orderData=await Order.findById({_id:req.params.id})
  await  Order.findByIdAndUpdate({_id:req.params.id},{
        totalAmount:orderData.totalAmount+totalAmount,
     
    })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};


const addAddressOrderById =async (req, res) => {
    console.log(req.params.id);
    
    const {      
        city,
        district,
        houseName,
        pincode,
        street,
        landmark
    
        } = req.body;
  await  Order.findByIdAndUpdate({_id:req.params.id},{
    city,
    district,
    houseName,
    pincode,
    street,
    landmark
     
    })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data Updated successfully",
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

const addPickUpDateOrderById =async (req, res) => {
   console.log(req.body);
   
  await  Order.findByIdAndUpdate({_id:req.params.id},{
  
    pickupDate:req.body.date
    })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data Updated successfully",
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

const UpdateServiceStatus=async (req, res) => {
    
    
   await  Order.findByIdAndUpdate({_id:req.params.id},{
   
    serviceStatus:req.body.serviceStatus,
  
     })
         .exec()
         .then(data => {
            console.log(data);
            
             res.json({
                 status: 200,
                 msg: "Data Updated successfully",
                 data: data
             });
         })
         .catch(err => {
             console.log(err);
             
             res.status(500).json({
                 status: 500,
                 msg: "No Data obtained",
                 Error: err
             });
         });
 };

 const addPayment =async (req, res) => {
    
    
    await  Order.findByIdAndUpdate({_id:req.params.id},{
    
     paymentStatus:true,
     orderStatus:"Paid"
      })
          .exec()
          .then(data => {
              res.json({
                  status: 200,
                  msg: "Data Updated successfully",
                  data: data
              });
          })
          .catch(err => {
              console.log(err);
              
              res.status(500).json({
                  status: 500,
                  msg: "No Data obtained",
                  Error: err
              });
          });
  };
const viewAllOrderByShopId = (req, res) => {
    Order.find({shopId:req.params.id}).populate('custId')
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};
const viewAllOrderByCustId = (req, res) => {
    Order.find({custId:req.params.id,orderStatus:"Paid"}).populate('shopId')
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};
const viewAllOrders = (req, res) => {
    Order.find()
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};


const viewAllServiceOrders =async (req, res) => {
    try{
    const serviceOrders = await orderServiceModel.find().populate('serviceId', 'name amount');
    
    // Aggregate revenue by service name
    const revenueData = serviceOrders.reduce((acc, order) => {
      const service = order.serviceId;
      if (service) {
        acc[service.name] = (acc[service.name] || 0) + service.amount;
      }
      return acc;
    }, {});

    res.status(200).json({ success: true, data: revenueData });
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  
}
}


const viewAllOrderforAgent = (req, res) => {
    Order.find({serviceStatus:{$in:['Requested Pickup','Requested Drop']},agentStatus:false})
    .populate('custId')
    .populate('shopId')
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};
const approveOrderByAgent =async (req, res) => {
    
    
    await  Order.findByIdAndUpdate({_id:req.params.id},{
    
     agentStatus:true,
     agentId:req.body.agentId
      })
          .exec()
          .then(data => {
              res.json({
                  status: 200,
                  msg: "Data Updated successfully",
                  data: data
              });
          })
          .catch(err => {
              console.log(err);
              
              res.status(500).json({
                  status: 500,
                  msg: "No Data obtained",
                  Error: err
              });
          });
  };
  const viewAllAssignedOrdersByAGId = (req, res) => {
    Order.find({agentId:req.params.id,serviceStatus:'Request Pickup'})
    .populate('custId')
    .populate('shopId')
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};
module.exports = {
    addOrder,
    viewAllOrderByShopId,
    viewAllOrders,
    viewOrderById,
    viewOrderByName,
    editOrderById,
    addPayment,
    addAddressOrderById,
    addPickUpDateOrderById,
    UpdateServiceStatus,
    viewAllOrderByCustId,
    viewAllOrderforAgent,
    viewAllAssignedOrdersByAGId,
    viewAllServiceOrders,
    approveOrderByAgent
}
