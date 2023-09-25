require('dotenv').config();
const express = require('express');
const router = express.Router();


// Home Route
router.get('/', async (req, res) => {
    const locals = {
        title: "Shrimad Bhagavad Gita",
        description: "Shrimad Bhagavad Gita, a simple explaination of total 18 Chapters and 700 Verses."
    }

    try {
        const url = 'https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?limit=18';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
            }
        };

        const response = await fetch(url, options);
        const chapters = await response.json();
        console.log(chapters);
        res.render('index', { locals, chapters });
    } catch (error) {
        console.error(error);
    }
})

// Single chapter Route
router.get('/chapter/:id', async (req, res) => {
    const chapterID = req.params.id;
    console.log(chapterID);
    const locals = {
        title: `BG Chapter ${chapterID}`,
        description: `Chapter ${chapterID} of Shrimad Bhagavad Gita.`
    }

    let chapter;
    const verses = [];

    // Fetching the chapter data
    try {
        const url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterID}/`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        chapter = await response.json();
    } catch (error) {
        console.error(error);
    }

    // Fetching the verses data
    try {
        const url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterID}/verses/`;
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
                "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
            },
        };

        const response = await fetch(url, options);
        const result = await response.json();

        for (let elm of result) {
            const verse = {
                id: elm.id,
                chapter_number: elm.chapter_number,
                verse_number: elm.verse_number,
                verse_text: elm.text,
                transliteration: elm.transliteration,
                word_meaning: elm.word_meanings,
                translation1: elm.translations.find(item => item.author_name === "Dr. S. Sankaranarayan"),
                translation2: elm.translations.find(item => item.author_name === "Shri Purohit Swami"),
                translation3: elm.translations.find(item => item.author_name === "Swami Sivananda"),
                translation4: elm.translations.find(item => item.author_name === "Swami Gambirananda"),
            };
            verses.push(verse);
        }
    } catch (error) {
        console.error(error);
    }

    res.render('chapterSingle', { locals, chapter, verses });
})

// Single verse Route
router.get('/chapter/:chapter_number/verse/:verse_number', async (req, res) => {
    const chapterNumber = req.params.chapter_number;
    const verseNumber = req.params.verse_number;

    const locals = {
        title: `BG Chapter ${chapterNumber} verse ${verseNumber}`,
        description: `Chapter ${chapterNumber} and verse ${verseNumber} of Shrimad Bhagavad Gita.`
    }

    console.log(chapterNumber, verseNumber);

    const url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/verses/${verseNumber}/`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
        const verse = {
            id: result.id,
            chapter_number: result.chapter_number,
            verse_number: result.verse_number,
            text: result.text,
            transliteration: result.transliteration,
            word_meaning: result.word_meanings,
            translation1: result.translations.find(item => item.author_name === "Dr. S. Sankaranarayan"),
            translation2: result.translations.find(item => item.author_name === "Shri Purohit Swami"),
            translation3: result.translations.find(item => item.author_name === "Swami Sivananda"),
            translation4: result.translations.find(item => item.author_name === "Swami Gambirananda"),
        };
        res.render('verseSingle', { locals, verse });
        console.log(verse);

    } catch (error) {
        console.error(error);
    }
})

// About Route
router.get('/about', (req, res) => {
    res.render('about');
})

// Contact Route
router.get('/contact', (req, res) => {
    res.render('contact');
})


module.exports = router;