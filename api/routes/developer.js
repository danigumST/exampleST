const express = require('express');
const Developer = require('../models/developer');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/devs', (req, res, next)=>{
    Developer.find().
    exec().
    then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    }).
    catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.post('/devs', (req, res, next)=>{
   
    const developer = new Developer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        background: req.body.background
    });
    
    developer.save().
    then(result => { 
        console.log(result);
        res.status(201).json({
            message: 'Developer added successfully',
            createdDev: developer
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

    
});

router.get('/devs/:devID', (req, res, next)=>{
    const devId = req.params.devID;
    Developer.findById(devId).
    exec().
    then(doc => {
        console.log(doc);
        if(doc) {
            res.status(200).json(doc);
        }
        else {
            res.status(404).json({
                message: "No valid entry for Provided ID"
            });
        }
    }).
    catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });   
    });
});

module.exports = router;