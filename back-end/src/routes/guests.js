const express = require('express');
const guestList = require('../models/guest');
const authCheck = require('../configuration/auth-check');

const router = new express.Router();

router.post('/create', (req, res) => {

    const guestObj = req.body;
    
    guestList
        .create(guestObj)
        .then((createGuest) => {
            res.status(200).json({
                success: true,
                message: "Guest successfully created",
                data: createGuest
            })
        })
        .catch((err) => {
            
            let message = "Something went wrong! Check forms for errors";
            return res.status(400).json({
                success: false,
                message: message
            })

        })

});

router.get('/all', (req, res) => {
    guestList.find()
        .then(guests => {
            if (guests.length > 0) {

                res.status(200).json(guests)
            }else{
                return res.status(404).json("Guest list is empty");
            }
        })
});

router.delete('/delete/:id', authCheck, (req, res) => {
    const id = req.params.id;

    guestList.findById(id)
        .then((guest) => {
            guest.remove()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        message: "Guest successfully deleted"
                    })
                })
        }).catch(err => {
            console.log(err);
            return res.status(404).json({
                success: false,
                message: 'Guest does not exists in database'
            });

        })

})
module.exports = router;