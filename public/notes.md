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
- <ul> unordered list
- <dt>
- <div> Creates a division element 
- valid hyperlink: <a href='https://:c.com'>x</a>

- deploy script: chmod +x deploy.sh to make script executable 
- go to console commands to take notes

# CSS
- possible way to load fonts from google (@import url('the url');)
- model outside going in: Margin, border, padding, content
- The CSS property padding p{padding: 1em;} puts space around the content of selected elements
- if you have a class="header" within a <div> that you wanted to turn just what was in there blue, you would use div.header {color: blue;}



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
    - commands
       - log (the basic usage is to output a log message )
       - Timers: to see how long a piece of code is running you can wrap it with time and timeEnd calls and it will output the duration between the time and timeEnd calls 
       - count: to see how many times a block of code is called you can use the count function (console.count('a'))
- DOM
- VaLid JavaScript functions: 
    - const f = (x) => {} (ananymous)
    - const f = function(x) {}
    - function f(x) {}
    - not valid: function f(x) = {}

- const f = y => ++y; console.log(f(3)) will output 4 because ++ increments by one 
- arrow functions:
    - tradional: (function (a) {return a + 100;})
    - remove function and place arrow between argument and body: (a) => {return a + 100;}
    - remove body braces and word return-return is implied: (a) => a + 100
    - remove parenthesis: a => a + 100

- valid javascript object? {n:1} the colon declares the object 
- JSON: {"x":3} not single quotes, undefined can't be used instead of 3

- 


- Promises:
    - In JavaScript, a Promise is an object that will produce a single value some time in the future. If the promise is successful, it will produce a resolved value, but if something goes wrong then it will produce a reason why the promise failed. The possible outcomes here are similar to that of promises in real life.
    - The progress of a promise can either be:
        - pending: the default state 
        - fulfilled: this is the state of a success (.then())
        - rejected: this is the state of a failed promise (.catch())

- Async/Await:
    - The word “async” before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.

    - The keyword await makes JavaScript wait until that promise settles and returns its result.

- Introducing Javascript into HTML
    - <script>1+1</script>
    - <script src='main.js' />
    - <div onclick='1+1'/>

- whhat does this output? 
    - let a = ['cow, 'rat, 'fish];
    - let b = a.reduce((a,v) => [a,v].join(':'));
    - console.log(b);
    - output: cow:rat:fish

which is a DNS subdomain?: c260.cs.byu.edu, look at domains

- what will this output?
  - const a = async function () { return new Promise((resolve, reject) => { setTimeout(() => {console.log('D'); resolve(true)}, 10000);})}
  - try {
    console.log('A');
    await a();
    console.log('B')
  } catch (e) {
    console.log('C');
  }
  - output: A D B

  - what is the output?
     - let a = ['cow', 'rat', 'fish'];
     - let b =  a.filter(v => v.match(/A|f/i));
     - console.log(b);
     - output: ['rat', 'fish']

     - regular expression denoted by / 

- What is the code output?
   - document.querySelector('p").addEventListener('mouseover', console.log)
    - output: Adds a mouseover event listener to a p element

- What does the DOM textContent property do?
   - sets the child text for the an element 

- To point to another DNS record, you should use the following DNS record type: CNAME (not redirects, just aliases)
    - A record: some host name and mappping to ip address
    - TXT: storing some text thing on there so people can go on server and get text
    - SOA: how to link your records to someone else 

- output?
   - const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('taco');
        resolve(true);
    } , 10000);
   });
   console.log('burger');

   p 
   .then((result) => console.log('shake))
   .catch((e) => console.log('salad'))
   .finally(() => console.log('noodles'))

   console.log('fries');

   - output: burger fries taco shake noodles


   - .gitignore 
            - node_modules 

  - make sure that somewhere in your middleware chain you respond to something, you can use res (response), or next but don't use both? res breaks the chain 


  ## Environments
  - Make a clear separation between development environment and production environment 