# Notes


## GIT
- git add - puts the code in staging 
- git commit - takes "screenshot"  of the code, but pretty much just saves the changes that have occured between commits 
- git push - pushes the code (or saves the code) to github 
- git pull - adds the code from github to your local environment, kind of an update 
- git merge - creates new commit that includes a summary of the commits from the other line 
- git rebase - it takes all the commits that you did on the other line and applies it to the main line 

## Terminal 
- cat - Output file
- less - Interactive file output
- wc - Word count
- ps - view process
- kill - kill a process
- sudo - execute as admin 
- ssh - remote shell 
- scp - securely copy files to a remote computer
- history - show history of commands
- ping - test connection 
- tracert - trace network 
- dig - DNS information (what records you have registered for your DNS)
- man - look in the manual 

printf "hello world" > test.txt (prints to a newly created txt file)

## VIM
- j - down
- k - up
- h - left
- l - right

While usually you are using keystrokes like chords (the combination pressed together illicits a response) vim is melodic, meaning the pattern you press matters 

# HTML
- start each page with <html> and within that you can add format items to then build off in design (CSS) and function (JavaScript)
- <li> is list
- <button> makes a button that you can then put words in 
- <header> is a header
- <footer> is a footer
- <h1> an example of a size of header, this can be changed 


# JavaScript 
- === gives equality representation like you would expect in other languages
    - example: console.log(0 === true)
- falsy
    - false, 0, -1, '', NaN, null, undefined
- truthy 
    - !falsy
- ex: if ((!false && undefined) || (true && !0))
    - first part turns out false, second part true: whole thing prints true 
- for (let i =1; i < 3; i++>)
- switch statements 
    - switching on some variable, cases on what that variable could equal 
    - look up how to do this 
    - breaks are necessary 
    - one of the author of javascript also wrote go 
- functions 
    - functions are primative types 
        - function functions() {
            debugger;
        }
        - inner functions:
        function f(){
            return 1;
        }
        console.log(f())
        - anonymous functions
            - f (already declared f above) = function (i) {
                return i; 
            };
            console.log(f(3));

    - optional parameters 
        - f = function (a, b, c = rat) {
            return [a, b, c];
        }
        console.log(f(1)); 
        it returns [1, undefined, rat]
    - arrow functions 
        - const arrow = () => 1;
        - arrow() returns 1 
    - arrow with block? (look up how to do this)
    - closures 
    - 
- DOM

- Promises:
    - In JavaScript, a Promise is an object that will produce a single value some time in the future. If the promise is successful, it will produce a resolved value, but if something goes wrong then it will produce a reason why the promise failed. The possible outcomes here are similar to that of promises in real life.
    - The progress of a promise can either be:
        - pending: the default state 
        - fulfilled: this is the state of a success (.then())
        - rejected: this is the state of a failed promise (.catch())