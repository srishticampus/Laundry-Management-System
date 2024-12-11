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
    
    Order.findById({_id:req.params.id}).populate('custId')

    .populate('shopId')
    .populate('dropAgentId')
    .populate('agentId')
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
    if(req.body.serviceStatus=="Delivery Completed"){
        await  Order.findByIdAndUpdate({_id:req.params.id},{

            orderStatus:'Completed',
          
             })
     }
    
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
     orderStatus:"Paid",
     orderDate:new Date()
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
    .sort({createdAt:-1})
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
    console.log("req.params.id",req.params.id);
    
    Order.find({custId:req.params.id,orderStatus: { $in: ["Paid", "Completed"] } })
    .populate('shopId').populate('agentId').populate('dropAgentId')
    .sort({createdAt:-1})
        .exec()
        .then(data => {
            console.log(data);
            
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
    .populate('custId').populate('shopId')
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
    Order.find({serviceStatus:{$in:['Requested Pickup','Reschedule Pickup']},agentStatus:false})
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

const viewAllDropOrderforAgent = (req, res) => {
    Order.find({serviceStatus:{$in:['Requested Drop','Reschedule Drop']},dropStatus:false})
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
  const approvedropOrderByAgent =async (req, res) => {
    
    
    await  Order.findByIdAndUpdate({_id:req.params.id},{
    
     dropStatus:true,
     dropAgentId:req.body.agentId
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
  const viewAllAssignedOrdersByAGIdPickUp = (req, res) => {
    Order.find(   { agentId: req.params.id,serviceStatus:{$in:['Requested Pickup','Reschedule Pickup']} })
    .sort({createdAt:-1})
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
const viewAllAssignedOrdersByAGIdDrop = (req, res) => {
    Order.find(   { agentId: req.params.id,serviceStatus:{$in:['Requested Drop','Reschedule Drop']} })
    .sort({createdAt:-1})
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


const viewAllCompletedOrdersByAGIdPickUp = (req, res) => {
    Order.find(   { agentId: req.params.id,serviceStatus:{$ne:'Requested Pickup' }})
    .sort({createdAt:-1})
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

const viewAllCompletedOrderByShopId = (req, res) => {
    Order.find(   { shopId: req.params.id,orderStatus:'Completed'})
    .populate('custId')
   .sort({createdAt:-1})
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
const viewAllCompletedOrdersByAGIdDrop = (req, res) => {
    Order.find(   { dropAgentId: req.params.id,serviceStatus:'Requested Drop' })
    .sort({createdAt:-1})
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

const updateOrderByIdonPickupIssue =async (req, res) => {
    console.log();
    
   const {     
         city,
    district,
    street,
    landmark,
    pincode,
    houseName,
    pickupDate
    
        } = req.body;
  await  Order.findByIdAndUpdate({_id:req.params.id},{
    city,
    district,
    street,
    landmark,
    pincode,
    houseName,
    pickupDate,
    serviceStatus:'Reschedule Pickup'
     
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
            console.log(err);
            
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

const updateOrderByIdonDropIssue =async (req, res) => {
  
   await  Order.findByIdAndUpdate({_id:req.params.id},{

     serviceStatus:'Reschedule Drop',
     dropStatus:false,
     dropAgentId:null
      
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
    viewAllAssignedOrdersByAGIdPickUp,
    viewAllAssignedOrdersByAGIdDrop,
    viewAllServiceOrders,
    viewAllDropOrderforAgent,   
    approveOrderByAgent,
    approvedropOrderByAgent,
    viewAllCompletedOrdersByAGIdDrop,
    viewAllCompletedOrdersByAGIdPickUp,
    viewAllCompletedOrderByShopId,
    updateOrderByIdonDropIssue,
    updateOrderByIdonPickupIssue,
    
}
