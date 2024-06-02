import express from 'express';
import { salonModel } from '../models/salonMo.js'
import { feedbackModel } from '../models/feedback.js'
import { supportModel } from '../models/support.js'
import { imployeModel } from '../models/imployJoin.js';
import multer from 'multer';
import Path from 'path';
const routes = express.Router()


// booking create logic
routes.post('/create', async (req, res) => {

    const { name, email, number, date, selectOption, message } = req.body

    try {
        const salon = await salonModel.create({
            name: name,
            email: email,
            number: number,
            date: date,
            selectOption: selectOption,
            message: message
        })

        if (!salon) {
            return res.status(404).json({ message: "salon not created" })
        }

        res.json(salon)
    } catch (error) {
        console.log('error');
        res.status(500).json({ message: 'Internal server error' });
    }
})

// booking show data logic
routes.post('/showData', async (req, res) => {
    try {
        const salon = await salonModel.find().sort({ createdAt: -1 })

        if (!salon) {
            return res.status(404).json({ message: "salon not found" })
        }

        res.json(salon)
    } catch (error) {
        console.log('error');
        res.status(500).json({ message: 'Internal server error' });
    }
})

// booking status logic
routes.put('/updateStatus/:id', async (req, res) => {
    const { id } = req.params
    const { status } = req.body;

    try {
        const updateSalon = await salonModel.findByIdAndUpdate(id, { status }, { new: true })
        if (!updateSalon) {
            return res.status(404).json({ message: "Salon entry not found" });
        }

        res.status(200).json(updateSalon);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }


})

// routes logic
routes.post('/getRoute/:id', async (req, res) => {
    const { id } = req.params
    try {
        const salon = await salonModel.findById(id)
        if (!salon) {
            return res.status(404).json({ error: 'salon not found' });
        }
        res.json(salon)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve all post data' });

    }

})

// booking edit status
routes.put('/edit/:id', async (req, res) => {
    const { id } = req.params
    try {
        const salon = await salonModel.findByIdAndUpdate(id, {
            selectOption: req.body.selectOption,
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            date: req.body.date,
            message: req.body.message
        })
        if (!salon) {
            return res.status(404).json({ error: 'salon not found' });
        }
        res.json(salon)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve all post data' });
    }

})

//booking delete logic
routes.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    try {
        const salon = await salonModel.findByIdAndDelete(id)
        if (!salon) {
            return res.status(404).json({ message: "salon not found" })
        }

        res.json(salon)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });

    }
})
// user feedback login
routes.post('/feedback', async (req, res) => {
    const { feedback } = req.body
    try {
        const salon = await feedbackModel.create({
            feedback: feedback
        })

        if (!salon) {
            return res.status(404).json({ message: "salon not created" })
        }

        res.json(salon)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });

    }
})
//feedback people supported logic
routes.post('/feedbackData', async (req, res) => {
    try {
        const support = await feedbackModel.find()
        if (!support) {
            return res.status(404).json({ message: "feedback not found" })
        }

        res.json(support)
    } catch (error) {
        console.log(error);
    }
})

// feedback delete 
routes.delete('/feedbackDelete/:id', async (req, res) => {
    const { id } = req.params

    try {

        const feedback = await feedbackModel.findByIdAndDelete(id)

        if (!feedback) {
            res.status(404).json({ message: "support not found" })
        }

        res.json(feedback)
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "support delete not found" })
    }
})

routes.post('/support', async (req, res) => {
    const { email } = req.body;

    try {
        const salon = await supportModel.create({
            email: email,
        })

        if (!salon) {
            return res.status(404).json({ message: "salon not created" })
        }

        res.json(salon)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });

    }
})



// people supported feedback find and show locic
routes.post('/supportData', async (req, res) => {
    try {
        const support = await supportModel.find()
        if (!support) {
            return res.status(404).json({ message: "feedback not found" })
        }

        res.json(support)
    } catch (error) {
        console.log(error);
    }
})

// support delete logic
routes.delete('/supportDelete/:id', async (req, res) => {
    const { id } = req.params

    try {

        const support = await supportModel.findByIdAndDelete(id)

        if (!support) {
            res.status(404).json({ message: "support not found" })
        }

        res.json(support)
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "support delete not found" })
    }
})


//imployee join
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + Path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

routes.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { name, phoneNumber, address, pincode, email } = req.body;


        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { filename } = req.file;
        const salon = await imployeModel.create({
            photo: filename,
            name,
            phoneNumber,
            address,
            pincode,
            email
        });

        if (!salon) {
            return res.status(404).json({ message: "salon not created" })
        }

        res.json(salon)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to upload file' });

    }
})

// all imployee show 
routes.post('/impDataShow', async (req, res) => {
    try {
        const salon = await imployeModel.find().sort({ createdAt: -1 })

        if (!salon) {
            return res.status(404).json({ message: "salon not found" })
        }

        res.json(salon)
    } catch (error) {
        console.log('error');
        res.status(500).json({ message: 'Internal server error' });
    }
})

// imployee status
routes.put('/imployJoinStatus/:id', async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    try {
        const employee = await imployeModel.findByIdAndUpdate(id, { status }, { new: true })

        if (!employee) {
            return res.status(404).json({ message: "Salon entry not found" });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "salon not found" })

    }
})

routes.delete('/imployDelete/:id', async (req, res) => {
    const { id } = req.params

    try {
        const imployee = await imployeModel.findByIdAndDelete(id)

        if (!imployee) {
            return res.status(404).json({ message: "imployee entry not found" });

        }

        res.json(imployee)
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "imployee delete not found" })

    }
})




export default routes