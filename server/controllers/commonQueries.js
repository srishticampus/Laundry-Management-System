
const nodemailer = require('nodemailer');

const url="http://localhost:3000/akshaya/vo-resetpwd/"
// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'supprot.web.application@gmail.com',
      pass: 'ukyw olqq kuql jnty'
    }
  });
  
  
  const testMail = (data) => {
    let email=data.email
    const mailOptions = {
      from: 'supprot.web.application@gmail.com',
      to: email,
      subject: 'Reset Password From Akshaya Web Portal',
      text: `Dear ${data.username},${'\n'}please check this link : ${url}${data._id} to reset your password`
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

  
const forgotPWDsentMail=async(email,schema)=>{

    try{
         data = await schema.findOne({ email:  email })
        // if(data==null){
        //  data = await workers.findOne({ email:  req.body.email })
        // }
        // if(data==null){
        //   data = await employer.findOne({ email: req.body.email})
        // }
        
          if (data != null)
            {
              let id=data._id.toString()
              testMail(data)
            return(data);
          }
          else
            return(null);
        }
        catch(err) {
          console.log(err);
          return(err)
        }
    
      }
module.exports={forgotPWDsentMail}