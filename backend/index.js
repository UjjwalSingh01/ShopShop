const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// const passwordSchema = z.string().refine((value) => {
//     const hasUppercase = /[A-Z]/.test(value);
//     const hasLowercase = /[a-z]/.test(value);
//     const hasNumber = /[0-9]/.test(value);
//     return hasUppercase && hasLowercase && hasNumber;
//   }, {
//     message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
//   });

// const emailSchema = zod.string().email();


// GENERATING OTP
function generateOTP(){
    return Math.floor(100000 + Math.random()*900000);
}
const otpMap = new Map();
const generatedotp = generateOTP();

// setting up nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
});
  

const emailVerification = async (user, otp) => {
    
    try {

        const mail = await transporter.sendMail({
            from: '"ShopShop" <dragneeln949@gmail.com>', 
            to: user, // list of receivers
            subject: "Email Verification For Registration", 
            // text: "Hello world?", // plain text body
            html: `<p>Email Verification OTP: ${otp}</p>`, 

            // attachments: [{ different type of attahment }]

            // list: {
            //     help: 'admin@example.com?subject=help',
            //     unsubscribe: [
            //         {
            //             url: 'http://example.com/unsubscribe',
            //             comment: 'A short note about this url'
            //         },
            //         'unsubscribe@example.com'
            //     ],
            //     id: {
            //         url: 'mylist.example.com',
            //         comment: 'This is my awesome list'
            //     }
            // }

        });
    
        console.log("Message sent: %s", mail.messageId);

        transporter.sendMail(mail, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Verification Mail Sent");
            }
        })

    } catch (error) {
        console.error("Error sending email:", error);
    }
}


app.post('/verify', async(req, res) => {
    const userEmail = await req.body;

    // email/input format verification

    const response = await prisma.user.findFirst({
        where:{
            email: userEmail.email,
        }
    })

    if(response != null){
        return res.status(400).json({
            message: "User Already Exists"
        })
    }

    const mailResult = await emailVerification(userEmail, generatedotp)
})


app.post('/register', async (req, res) => {

    const detail = await req.body;

    try {

        if(detail.otp != generatedotp){
            res.status(400).json({
                message: "Invalid Otp"
            })
            return
        }

        // email/input format verification

        const saltRounds = 10;
        const hashpassword = await bcrypt.hash(detail.password, saltRounds);

        const response = await prisma.user.create({
            data: {
                firstname: detail.firstname,
                lastname: detail.lastname,
                email: detail.email,
                password: hashpassword
            }
        })
        
        const token = jwt.sign({userId: response.id}, process.env.JWT_SECRET);

        const cartCount = await prisma.cart.count();

        return res.json({
            message:"Register Successful",
            token: token,
            cartCount: cartCount
        })
        
        
    } catch (error) {
        console.error("Server-Side Error in Registering: ", error)
    }

})


app.post('/login', async(req, res) => {
    // const prisma = new PrismaClient({
    //     datasourceUrl: process.env.ACCELERATE_DATABASE_URL
    // }).$extends(withAccelerate())

    const detail = await req.body;
    console.log(detail);

    try {
        const response = await prisma.user.findFirst({
            where:{
                email: detail.email
            }
        })

        if(response === null){
            return res.json({
                message: "User Does not Exists"
            })
        }

        const isMatch = await bcrypt.compare(detail.password, response.password);
        if (!isMatch) {
            return res.status(422).json({
                message: "Invalid Credentials"
            });
        }

        // Create Token
        const token = jwt.sign({userId: response.id},  process.env.JWT_SECRET);

        const cartCount = await prisma.cart.count();

        return res.json({
            message:"Login Successful",
            token: token,
            cartCount: cartCount
        })
    

    } catch (error) {
        console.error("Server-Side Error in Login: ", error);
    }
})


// Middleware to check for JWT token in /user/* routes
app.use("/user/*", async (req, res, next) => {
    const token = req.header("Authorization")
    console.log(token)
  
    if (!token) {
      return res.status(401).json({ message: "You Are Not Logged In" });
    }
  
    try {

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        req.userId = decodedToken.userId;
        
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
});


app.get('/product', async(req, res) => {
    try {
        const products = await prisma.product.findMany();

        res.status(200).json({
            message: products,
        });

      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})


app.post('/addproduct', async(req, res) => {

    const detail = req.body

    try {

        const admin = await prisma.admin.findFirst({
            where: {
                email: detail.email
            }
        })

        if(!admin) {
            return res.json({
                message: "Admin Credentials Are Wrong"
            })
        }

        const response = await prisma.product.create({
            data: {
                title: detail.title,
                description: detail.description,
                quantity: detail.quantity,
                price: detail.price,
                discount_price: detail.discount_price,
                category: detail.category
            }
        })

        return res.json({
            message: response
        })

    } catch (error) {
        console.error("Server-Side Error in Adding Product: ", error)
    }
})


app.post('/user/addcart', async(req, res) => {

    const detail = req.body;
    
    if(req.userId === undefined) {
        return res.json({
            message: "UserId Does Not Exist"
        })
    }
    const userId = req.userId;

    try {
        const response = await prisma.cart.create({
            data: {                
                userId: userId,
                title: detail.title,
                item_id: detail.item_id,
                price: detail.price,
                quantity: detail.quantity
            }
        })

        return res.json({
            message: response
        })

    } catch(error) {
        console.error("Server-Side Error in adding Cart: ", error);
    }
})


app.get('/user/cart', async(req, res) => {

    if(req.userId === undefined) {
        return res.json({
            message: "UserId Does Not Exist"
        })
    }
    const userId = req.userId;

    console.log(userId);

    try {
        const response = await prisma.cart.findMany({
            where:{
                userId: userId,
            }
        })

        console.log(response)

        if(response === null){
            return res.json({
                message: []
            })
        }
        else {
            return res.json({
                message: response
            })
        }
        
    } catch (error) {
        console.error("Server-side Error in Fetching Cart: ", error)
    }
})



app.post('/user/addorder', async(req, res) => {

    const detail = await req.body;
    
    if(req.userId === undefined) {
        return res.json({
            message: "UserId Does Not Exist"
        })
    }

    const userId = req.userId;

    const currentDate = new Date()
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = String(currentDate.getFullYear());

    const date = `${day}/${month}/${year}`;

    try {

        for (const item of detail) {

            const response = await prisma.orders.create({
                data:{
                    userId: userId,
                    item_id: item.item_id, 
                    title: item.title,
                    date: date,
                    price: item.price
                }
            })

            const result = await prisma.cart.deleteMany({
                where: {
                    id: item.item_id
                }
            })

        }

        return res.json({
            message: "Items Ordered"
        })

    } catch (error) {
        console.error("Server-side Error in Adding Order: ")
    }
})


app.get('/user/orders', async(req, res) => {
    
    const userId = req.userId;

    try {
        const response = await prisma.orders.findMany({
            where:{
                userId: userId
            }
        })

        if(response === null){
            return res.json({
                message: []
            })
        }
        else {
            return res.json({
                message: response
            })
        }

    } catch (error) {
        console.error("Server-side Error in Fetching Orders: ", error)
    }

})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});