// This is the brain of our whole app! It handles all the chat logic and screen switching.

// *** 1. We start the app here! ***
// Always set the starting screen to 'screen1' so the user doesn't get lost.
setScreen("screen1");
setProperty("outputArea", "text", "Hey there! I'm ready to chat and help you think through anything. What's on your mind?");

// --- Screen 1: The Super-Friendly Chat Buddy ---

// 1. Chat on Click: When the user hits the submit button on Screen 1, this function runs.
onEvent("submitButton1", "click", function() {
  var userText = getText("userInput").toLowerCase().trim();
  var aiResponse = "";
  
  // Just checking if the user typed numbers and math symbols (like + or -)
  var isMath = /[0-9]/.test(userText) && /[\+\-\*\/]/.test(userText);
  
  // *** SCREEN 1 CHAT LIBRARY: Checking for feelings and topics ***
  if (userText.length === 0) {
    aiResponse = "I'm here to listen or help you think things through. What should we talk about?";
  } else if (userText.includes("hi") || userText.includes("hello") || userText.includes("hey")) {
    var greetings = [
      "Hey! I hope you're having an awesome day. Tell me what's up.",
      "Hello! It's great to hear from you. What are your big plans?",
      "Hi friend! I'm always ready for a good chat."
    ];
    // Picking one of the friendly greetings at random
    aiResponse = greetings[randomNumber(0, greetings.length - 1)];
  } else if (userText.includes("how are you") || userText.includes("doing")) {
    aiResponse = "I'm doing great, thanks for asking! My focus is totally on you right now. What's the latest?";
  } else if (userText.includes("bored") || userText.includes("nothing to do")) {
    var boredResponses = [
      "Feeling a bit sluggish? Let's fix that! If you need a creative spark, the expert zone can generate a fun story idea for you. Or, we can just keep talking.",
      "Boredom is just a sign that your brain is ready for a new challenge. Ready to move on to some fresh ideas in the specialty area?",
    ];
    aiResponse = boredResponses[randomNumber(0, boredResponses.length - 1)];
  } else if (userText.includes("stressed") || userText.includes("hard") || userText.includes("tired")) {
    aiResponse = "I'm so sorry you're feeling that way! Please, take a deep breath. Remember that your well-being is more important than any task. If you need actionable strategies to handle the stress, the expert zone has great productivity tips.";
  } else if (userText.includes("motivation") || userText.includes("can't")) {
    aiResponse = "Don't let that voice win! You're capable of more than you think. Let's try the 5-minute rule: commit to working for just 5 minutes. If you need a detailed step-by-step plan for a project, the expert zone can help structure that for you.";
  } else if (userText.includes("school") || userText.includes("class")) {
    aiResponse = "How is school going? That takes a lot of effort! If you need quick facts or help with homework structure, the expert area is much better at that kind of specific task.";
  } else if (isMath) {
    // Math redirection, but phrased like a friend making a suggestion
    aiResponse = "I can definitely handle math, but the expert zone is optimized for quick, accurate calculations. We should head there for that!";
  } else {
    // Default response: The friend doesn't know, so they suggest the next screen.
    aiResponse = "That sounds fascinating! I can definitely listen to all your ideas and feelings. If you ever need specific, high-level tools—like calculations or project planning—that's what the next screen is designed for. What's your next move?";
  }
  
  setProperty("outputArea", "text", aiResponse);
  setProperty("userInput", "text", ""); // Clear the user's input
});

// 2. Navigation: When the user clicks the moveNext button, we switch screens!
onEvent("moveNext", "click", function() {
  setProperty("userInput", "text", "");
  setScreen("screen2");
  setProperty("outputArea2", "text", "Welcome to the expert zone! Ask me for a quick 'calculation' (e.g., 25 * 4), a 'coding challenge', a 'story idea', or say 'joke' to fetch a new joke from the web!");
});


// --- Screen 2: The Expert Zone (Specialized Tools & API) ---

// 3. Screen 2: When the user clicks submitButton2, run the expert tool logic.
onEvent("submitButton2", "click", function() {
  var userText = getText("userInput2");
  var cleanedText = userText.toLowerCase().trim();
  var aiResponse = "";
  
  // Check if the input is a direct calculation
  var isMath = /[0-9]/.test(userText) && /[\+\-\*\/]/.test(userText);
  
  if (isMath) {
    // If it's math, we use the super-powerful 'eval' function to solve it!
    try {
      var result = eval(userText);
      aiResponse = "Calculation complete! The precise answer is: " + result + ". What's the next task?";
    } catch (e) {
      aiResponse = "Oops, that calculation was too tricky! Please try a simpler math expression, like '100 / 4'.";
    }
  } else if (cleanedText.includes("story") || cleanedText.includes("write")) {
    // *** STORY GENERATOR: Pretends to be a creative tool ***
    var settings = [
      "A brave squirrel searching for the legendary golden acorn.",
      "A lost astronaut who lands on a planet made entirely of jello.",
      "A detective cat trying to solve the mystery of the missing lasagna.",
      "A wizard who can only cast spells using dad jokes.",
    ];
    var story = settings[randomNumber(0, settings.length - 1)];
    aiResponse = "Here is a prompt for a super cool story: **" + story + "**! I think you should start writing now.";
    
  } else if (cleanedText.includes("joke") || cleanedText.includes("fun")) {
    // *** API LOGIC: Time to fetch a silly joke from the internet! ***
    setProperty("outputArea2", "text", "Accessing external knowledge source... (Hold on, the joke server is loading!)");
    
    // This is the real API call part! It goes out to the web and waits for the answer.
    sendHttpRequest("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=racist,sexist,explicit&type=single", function(status, response) {
      if (status === 200) {
        // Success! We got the data back.
        var jokeData = JSON.parse(response);
        setProperty("outputArea2", "text", "Here's one I found:\n\n" + jokeData.joke);
      } else {
        // Uh oh, the internet failed. Use a backup joke.
        setProperty("outputArea2", "text", "The network is a little slow! Here's a classic: Why do programmers prefer dark mode? Because light attracts bugs!");
      }
    });
    setProperty("userInput2", "text", "");
    return; // Important: Stop here so we don't accidentally run the rest of the code!
    
  } else if (cleanedText.includes("project plan") || cleanedText.includes("start project") || cleanedText.includes("organize")) {
    aiResponse = "Absolutely! For any big task, use this high-level plan: 1. **Deconstruct** (Break it into 5 tiny parts). 2. **Prioritize** (Which part is the 'lump' you need to do first?). 3. **Execute** (Focus only on that first part!). You can do this!";
    
  } else if (cleanedText.includes("coding challenge") || cleanedText.includes("learn code") || cleanedText.includes("javascript")) {
    aiResponse = "Let's test your logic! Create a loop that prints the word 'APP' exactly 10 times, but only if a variable named 'isRunning' is true. That will challenge your loops and conditionals!";
    
  } else if (cleanedText.includes("focus") || cleanedText.includes("productivity") || cleanedText.includes("tip")) {
    aiResponse = "High-Value Tip: The 'Seinfeld Strategy'. Get a huge wall calendar. For every day you work toward your goal, draw a big red X over that date. Your goal is to **never break the chain** of X's. It's incredibly motivating!";
    
  } else if (cleanedText.includes("fact") || cleanedText.includes("history") || cleanedText.includes("science")) {
    var factResponses = [
      "Fascinating Fact: Astronauts can't cry properly in space because there is no gravity to pull the tears down!",
      "History Insight: Did you know that the word 'robot' comes from a Czech word 'robota' meaning 'forced labor'?",
      "Cool Fact: If you could fold a piece of paper 42 times, it would be thick enough to reach the moon!",
    ];
    aiResponse = factResponses[randomNumber(0, factResponses.length - 1)];
    
  } else {
    // Default response for the expert assistant
    aiResponse = "I have tons of specific, high-quality tools! Try asking for a 'coding challenge,' a 'story idea,' a 'project plan,' or any quick calculation. What task can I optimize for you?";
  }
  
  // Put the final answer on the screen!
  setProperty("outputArea2", "text", aiResponse);
  
  // Clear the input box
  setProperty("userInput2", "text", "");
});


// 4. Screen 2: User clicks 'Support' -> go to Screen 3
onEvent("supportButton1", "click", function() {
  setScreen("screen3");
  setProperty("outputArea3", "text", "Thanks for your help! You can share any feedback, ideas, or problems you noticed here. Type below and click submit.");
});

// 5. Screen 2: User clicks 'Don't Support' -> go to Screen 3
onEvent("dontsupportButton1", "click", function() {
  setScreen("screen3");
  setProperty("outputArea3", "text", "Thanks for your help! You can share any feedback, ideas, or problems you noticed here. Type below and click click submit.");
});


// --- Screen 3: The Feedback Zone ---

// 6. Screen 3: When the user clicks the submit button (submitButton3), run the simple feedback loop.
onEvent("submitButton3", "click", function() {
  // Simple, warm acknowledgment—we just thank them for the input!
  var aiResponse = "That is excellent! We appreciate your input so much. Your feedback helps make the app better for everyone!";
  
  setProperty("outputArea3", "text", aiResponse);
  setProperty("userInput3", "text", "");
});


// 7. Screen 3: When the user clicks the homeButton, go back to screen 1.
onEvent("homeButton", "click", function() {
  setScreen("screen1");
});
