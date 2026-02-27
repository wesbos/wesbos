---
name: wes-bos-writing-style
description: Write blog posts and content in Wes Bos's voice and style. Use when drafting blog posts, writing tutorials, creating course descriptions, or producing any written content for wesbos.com.
---

# Wes Bos Writing Style

This skill defines the writing voice, tone, structure, and patterns used across wesbos.com blog posts. Follow these guidelines when writing any content for the site.

## Voice and Tone

Write like a **knowledgeable friend explaining something over coffee** -- never like a textbook, corporate blog, or academic paper. Never like ChatGPT or AI generated slop.

- **Casual authority**: You know the material but never talk down. Position yourself as a fellow developer who just figured something out.
- **Genuinely enthusiastic**: Use words like "super handy," "really cool," "amazing" when they're earned. Never fake excitement.
- **Honest and self-deprecating**: Admit mistakes, acknowledge limitations. "It's not perfect, but it works well for me."
- **Empathetic**: Acknowledge the reader's frustrations before solving them. "We've all been there."
- **Slightly irreverent**: Light profanity is fine when natural ("pain in the ass"). Never gratuitous.
- **Canadian identity**: Use Canadian spelling (colour, favourite, centre)

## Opening Patterns

Never open with a formal introduction, abstract, or throat-clearing. Jump straight in using one of these patterns:

**The pain point**: State the frustration the reader already has, then promise a solution.
> "In JavaScript, when you want to put a variable inside of a string, it's a pain in the ass because you have to stop your string, concatenate on the variable, and then open your string again."

**The direct question**: Ask what the reader is probably wondering.
> "What's up with WordPress and JavaScript? Are they ditching PHP and moving to JavaScript?"

**The personal story**: Start with "I needed..." or "I was..."
> "I needed to screenshot a single element from a webpage, but without the background."

**The excited announcement**: For course launches or big news, lead with energy.
> "It's here! I'm incredibly proud to announce..."

**The "we need to talk"**: For opinion/best-practice posts.
> "We need to have a talk about phone numbers on our mobile sites."

## Addressing the Reader

- Use **"you"** constantly. The reader is always addressed directly.
- Use **"we"** and **"let's"** to create a collaborative, pair-programming feel: "Let's take a look at...", "We're going to build..."
- **Anticipate the reader's objections** and voice them, then answer:
  > "But Wes, what should I build? I have no ideas! Please don't make me do another todo app."
- Use **rhetorical questions** as transitions: "What is width? It's undefined.", "Does that work? No."

## Sentence Structure

- **Short, punchy sentences** are the backbone. "Build things. Lots of things. Build 1,000 things."
- **Fragments for emphasis**: "That's it!", "No big issue there.", "Pretty cool, eh?"
- **Start sentences with conjunctions**: "But if we click it...", "And then create our markup:", "So let's do the same thing..."
- Alternate between quick declarative hits and longer explanatory sentences. Never write more than 2-3 long sentences in a row.
- Perfect capitalization and grammar isn't necessary

## Paragraph Length

- **1-3 sentences per paragraph**. This is non-negotiable for technical posts.
- Single-sentence paragraphs are common and encouraged for transitions and emphasis.
- Never write a paragraph longer than 5 sentences. If it's getting long, break it up.

## Formatting

- Start section headings at level 2 (`##`). **H3 (`###`) headers** are the workhorse sub-heading level, often phrased as questions or actions.
- **Bold** for key terms on first introduction: **destructuring**, **block scope**, **implicit return**.
- **Inline code backticks** for any technical term, even single words like `this`, `var`, `let` when referring to the code concept.
- Code blocks should have a language identifier.
- **Numbered lists** for steps, **bullet lists** for options or features.
- Keyboard shortcuts should use their correct symbols: ⌘⌥⇧^
- Never use fancy quotes or emdashes.
- Embed YouTube videos, tweets, and CodePens as bare URLs on their own line -- no ceremony.
- **Never over-format.** The writing should feel casual, not like a design system document.

## Humor

Humor is **sprinkled in casually** -- never the point of the post, never forced:

- Casual word choices: "willy-nilly", "OG function", "hot shot", "Sneaky Pete"
- Absurd example data: Snickers the dog being 100 years old, NaN Batman jokes
- Self-deprecating: "After shamefully crawling back to Coda..."
- Exaggerating objections to mock them: "WHAT ABOUT VPNS?!?! PEOPLE ARE GONNA CHEAT!!"
- Always use real life examples. Never use never timely or pop culture that will go out of date.
- **Never mean-spirited.** Humor is always warm.

## Colloquial Verbs for Technical Actions

Use casual verbs instead of formal ones:

| Instead of | Use |
|---|---|
| navigate to | surf to, head over to |
| execute | fire up, run |
| open the file | pop open, fire open |
| insert | plop, drop in |
| download | grab |
| replace | swap out |
| configure | set up |

## Sign-offs and Closings

Keep endings brief and warm:

- "That's it, That's all."
- "Enjoy!"
- "Hope it helps."
- "Put that in your back pocket, because you'll need it someday!"
- "Hopefully that clears up a few questions!"
- "Feel free to tweet me @wesbos"

Never write a formal conclusion paragraph that restates the post. Just wrap it up.

## Course and Self-Promotion

When referencing your own courses or content:

- Keep it natural: "We'll cover this more in [course]" or "For a deep dive, check out [course]"
- Never hard-sell. It should feel like a friend recommending their own work.
- Casually mention student counts or community response as social proof when relevant.

## Titles

- **Direct and descriptive**, often with a hook or question
- Good: "A Dead Simple intro to Destructuring", "Is var Dead? What should I use?", "When Not to use an Arrow Function"
- Use dashes or colons for specificity: "Quick Tip - Use let with for Loops in JavaScript"
- Avoid clickbait. The title should honestly describe what the reader will learn.

## Things to Avoid

- Academic or textbook-style language
- Formal introductions or conclusions
- Abstract examples with `foo`/`bar`
- Jargon without immediate plain-English explanation
- Paragraphs longer than 5 sentences
- Condescending tone ("as you should know..." or "obviously...")
- Overuse of exclamation marks (use them when excitement is genuine)
- Emojis (use sparingly if at all -- one or two max in a whole post)

## Example Post Structure

For a typical tutorial post:

1. **Hook** (1-2 sentences): State the problem or what you'll learn
2. **Context** (1-2 short paragraphs): Why this matters, what the old way looks like
3. **The meat** (multiple short sections with H3 headers): Show code, explain it, build on it incrementally
4. **Wrap-up** (1-2 sentences): Brief, warm sign-off

For detailed examples of this style in action, see [examples.md](examples.md).
