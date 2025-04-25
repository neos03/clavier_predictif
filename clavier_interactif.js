import fs from 'fs';
import * as R from 'ramda';
import readline from 'readline';

/**
 * Build an order-N Markov model from input text (lettres).
 */
const buildModel = (text, order) => {
    const chars = text.split('');
    const counts = {};
    for (let i = 0; i + order < chars.length; i++) {
        const gram = chars.slice(i, i + order).join('');
        const nextChar = chars[i + order];
        counts[gram] = counts[gram] || {};
        counts[gram][nextChar] = (counts[gram][nextChar] || 0) + 1;
    }
    const normalizeFreqs = freqs => {
        const total = R.sum(R.values(freqs));
        return R.map(count => count / total, freqs);
    };
    return R.mapObjIndexed(normalizeFreqs, counts);
};

/**
 * Build a word model (mot ➞ mot suivant).
 */
const buildWordModel = (text) => {
    const words = text.toLowerCase().match(/\b[a-zà-ſ'-]+\b/g);
    const counts = {};
    for (let i = 0; i < words.length - 1; i++) {
        const current = words[i];
        const next = words[i + 1];
        counts[current] = counts[current] || {};
        counts[current][next] = (counts[current][next] || 0) + 1;
    }
    const normalizeFreqs = freqs => {
        const total = R.sum(R.values(freqs));
        return R.map(count => count / total, freqs);
    };
    return R.mapObjIndexed(normalizeFreqs, counts);
};

const loadModels = (inputFile, maxOrder = 10) => {
    const text = fs.readFileSync(inputFile, 'utf-8');
    const orders = R.range(1, maxOrder + 1);
    return {
        letterModels: R.zipObj(orders, orders.map(order => buildModel(text, order))),
        wordModel: buildWordModel(text)
    };
};

// --- Partie interactive ---
const inputFile = process.argv[2] || 'base.txt';
const maxOrder  = parseInt(process.argv[3], 10) || 10;

const { letterModels, wordModel } = loadModels(inputFile, maxOrder);

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

let currentWord = '';
let fullSentence = '';

console.log(`Modèles chargés depuis "${inputFile}".`);
console.log('Tapez des lettres ; espace pour valider le mot ; Ctrl+C pour quitter.');

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        console.log('\nPhrase complète tapée :', fullSentence.trim());
        process.exit();
    }

    if (str === ' ') {
        if (currentWord.length > 0) {
            fullSentence += currentWord + ' ';
            console.log(`\nPhrase complète : "${fullSentence.trim()}"`);

            // --- Prédictions du mot suivant basées sur les 2 derniers mots ---
            const contextWords = fullSentence.trim().split(/\s+/);
            const lastTwo = contextWords.slice(-2).join(' ');

            const candidates = {};
            const wordsInText = fs.readFileSync(inputFile, 'utf-8').split(/\s+/);

            for (let i = 0; i < wordsInText.length - 2; i++) {
                const gram = wordsInText[i] + ' ' + wordsInText[i + 1];
                const nextWord = wordsInText[i + 2];
                if (gram === lastTwo) {
                    candidates[nextWord] = (candidates[nextWord] || 0) + 1;
                }
            }

            const predictions = Object.entries(candidates)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3);

            if (predictions.length) {
                console.log('Suggestions du prochain mot (bigramme) :');
                predictions.forEach(([word, count]) => {
                    console.log(`  ${word}`);
                });
            } else {
                console.log('Pas de suggestion pour ce contexte.');
            }
        }
        currentWord = '';
        return;
    }

    if (/^[a-zà-ſ'-]$/i.test(str)) {
        currentWord += str;

        // --- Suggestions de lettres ---
        let sugg;
        let orderUsed = 0;
        for (let order = Math.min(currentWord.length, maxOrder); order > 0; order--) {
            const gram = currentWord.slice(-order);
            sugg = letterModels[order]?.[gram];
            if (sugg) {
                orderUsed = order;
                break;
            }
        }

        if (sugg) {
            console.log(`\nContexte lettres: "${currentWord}" (ordre ${orderUsed})`);
            R.pipe(
                R.toPairs,
                R.sortBy(R.compose(R.negate, R.prop(1))),
                R.take(5),
                R.forEach(([c, p]) =>
                    console.log(`  Lettre: ${c} (${(p * 100).toFixed(2)}%)`)
                )
            )(sugg);
        }

        // --- Suggestions de mots en cours ---
        const wordSuggestions = R.pipe(
            R.keys,
            R.filter(word => word.startsWith(currentWord.toLowerCase())),
            R.take(3)
        )(wordModel);

        if (wordSuggestions.length) {
            console.log('Suggestions de mots en cours :');
            wordSuggestions.forEach(word => {
                console.log(`  ${word}`);
            });
        }
    }
});
