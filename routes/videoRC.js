const express = require('express');
const Video = require('../models/videoModel');
const router = express.Router();

// "baseURL"/videos

// All videos
router.get('/all/:page', async (req, res) => {
    let allvideos;
    try {
        let result = await Video.find({});
        allvideos = result;
    }
    catch (err) {
        res.send('error' + err);
    }
    let videos = [];
    let num = req.params.page;
    for (let i = (num - 1) * 10; i < num * 10; i++)
        if (allvideos[i] != null)
            videos.push(allvideos[i]);
    // Generate random number
    for (let i = videos.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = videos[i];
        videos[i] = videos[j];
        videos[j] = temp;
    }
    res.send(videos);
});

// Upload video.
router.post('/', (req, res) => {
    let temp = req.body;
    let rtags = temp.tags.split(/\s*(?:,|$)\s*/);
    temp.tags = rtags;
    let video = Video(temp);
    video.save()
        .then((data) => res.send(data))
        .catch((error) => res.send(error));
})

// Get videos in myvideos section.
router.get('/:creatorid', (req, res) => {
    Video.find({creatorid:req.params.creatorid})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => res.send(err));
});

//get video on videopage
router.get('/o/:videoid', (req, res) => {
    Video.findById(req.params.videoid)
        .then((video) => {
            res.send(video);
            Video.findByIdAndUpdate(video.id, { $set: { views: video.views + 1 } })
                .catch((err) => res.status(401).send(err))
        })
        .catch((error) => res.status(401).send("at api" + error));
});

// search video
router.get('/search/:query', (req, res) => {
    Video.find({})
        .then((videos) => {
            const results = [];
            const str = req.params.query.toLowerCase();
            const list = str.split('-');
            for (let i = 0; i < videos.length; i++) {
                let string = "", count = 0;
                string = videos[i].des+" "+videos[i].creatorname+" "+videos[i].title+" "+videos[i].tags;
                string = string.replace(/,/g,' ');
                string = string.replace(/\s\s+/g,' ');
                string = string.toLowerCase();
                for (let j = 0; j < list.length; j++) {
                    if (string.includes(list[j]))
                        count++;
                }
                if (count>=1)
                    results.push(videos[i]);
            }
            res.send(results);
        })
        .catch((error) => res.status(401).send("at api" + error));
});

module.exports = router