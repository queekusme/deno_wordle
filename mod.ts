import * as path from "https://deno.land/std@0.63.0/path/mod.ts";

const resetSequence = "\x1b[0m";

enum MatchPlacement
{
    Good = "\x1b[30m\x1b[42m",
    Position = "\x1b[30m\x1b[43m",
    Bad = "\x1b[30m\x1b[0m"
}

interface IMatch
{
    letter: string,
    placement: MatchPlacement
}

const matchWords = (guess: string, wordOfTheDay: string): IMatch[] =>
{
    const match: IMatch[] = [];

    for(let i = 0; i < guess.length; i++)
    {
        const gChar = guess.charAt(i);
        const wChar = wordOfTheDay.charAt(i)
        const countOfGCharInWord = wordOfTheDay.split("").filter((char) => char === gChar).length;
        const countOfGCharInGuess = guess.split("").filter((char) => char === gChar).length;

        match.push({
            letter: gChar,
            placement: wordOfTheDay.length >= (i + 1) && wChar == gChar
                ? MatchPlacement.Good
                : (wordOfTheDay.includes(gChar) && countOfGCharInGuess <= countOfGCharInWord
                    ? MatchPlacement.Position
                    : MatchPlacement.Bad)
        });
    }

    return match;
}

const renderMatch = (match: IMatch[]): string =>
{
    let word = "";

    for(const matchPart of match)
        word += `${matchPart.placement}${matchPart.letter}${resetSequence}`;

    return word;
}

const wordleFolder = `${Deno.env.get("HOME")}/.wordle`;

const generateWOD = async () =>
{
    try
    {
        const content = await Deno.readTextFile(path.resolve(`${wordleFolder}/words.txt`));
        const words = content.split("\n");

        await Deno.writeTextFile(path.resolve(`${wordleFolder}/daily.txt`), words.at(Math.random() * (words.length)) ?? "#####");

        console.log("Generated")
    }
    catch(e)
    {
        console.error(e.message);
        Deno.exit(1);
    }
}

const guess = Deno.args[0];

if(guess == "--generate")
{
    await generateWOD();
    Deno.exit(0);
}

console.log(renderMatch(matchWords(guess, (await Deno.readTextFile(path.resolve(`${wordleFolder}/daily.txt`))).toString().toLowerCase())));
