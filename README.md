# chatFriendAPP
Chat Friend App: The Ultra-Human Conversational AI

Project Overview

This app is a project built in Code.org App Lab to see how human-like we can make a program feel without using actual external AI (like ChatGPT or Gemini). The goal was to build a multi-screen chat interface that feels intuitive, friendly, and genuinely helpful. We went for conversational flow over robotic commands!

The app uses an advanced simulation library—a huge amount of custom JavaScript logic—to manage two distinct "personalities" and a user feedback system.

Technical Vibe Check & Implementation Details

1. The Screen 1 Vibe: Your Best Friend Chat

The Goal: To sound like a human text message. We use contractions, slang, and super casual phrasing for all responses.

The "Friend API": The code constantly checks for feelings and moods (like "stressed" or "bored") instead of just keywords. It then offers supportive, friendly, and contextual advice.

Smart Routing: If the user asks for serious math or a specific tool, the "Friend" chat gently suggests moving to the "Expert Zone" (Screen 2), which is where the heavy lifting happens.

2. The Screen 2 Vibe: The Expert Workspace

The Goal: To feel like a high-end toolset without being overly formal.

Real API Demo: This is where we prove the app can connect to the real internet! We use the sendHttpRequest function to fetch a live, random programming joke from a public external API. This is the biggest technical feature.

Built-in Tools: We use JavaScript's built-in power to simulate advanced features:

Calculation Tool: Uses eval() to quickly solve math problems.

Story Generator: Provides fun, creative writing prompts.

Expert Advice: Delivers structured tips on coding, productivity, and project planning.

3. The Feedback Loop

Screen 3: This screen is just a chill way to thank the user for their thoughts. The bot's response is warm and friendly, confirming that the "app team" loves the input!

Screen Architecture and IDs

Screen Name

The Vibe / Function

Key Element IDs (Must Match Code!)

screen1

Friendly Chat Buddy

userInput, outputArea, submitButton1, moveNext

screen2

Expert Tools & API Access

userInput2, outputArea2, submitButton2, supportButton1, dontsupportButton1

screen3

Feedback Receiver

userInput3, outputArea3, submitButton3, homeButton
