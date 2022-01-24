# deno_wordle
a deno commandline version of wordle

## Setup
To set this up
1. Download Deno https://deno.land/#installation
2. Create a file at /~/.wordle/words.txt with a word on each line. Wordle has 5 letter words however this version isn't constrained to this principal
3. Run `deno run --allow-read --allow-write --allow-env mod.ts --generate` to generate a word... this can be added as a daily cron job should you desire

## To Play
To play the game:
1. Run the following command `deno run --allow-read --allow-write --allow-env mod.ts <guess>` where <guess> is replaced with your word guess.

## Limitations
1. there is no word limit, guess words as long as you wish, recommend you start with words 5 characters in length.
2. You can guess more characters than the word. Its best to know the lengths of word to avoid any fristration...
3. You have as many guesses as you want... I didn't wanna add the extra complexity, this one is just for fun...
