# Interview answers — raw (Bill, spoken)

> **Status: raw data collection.** Transcribed from Bill's spoken recordings, lightly cleaned
> for readability (filler/false-starts removed, proper nouns fixed in `[brackets]`) — substance,
> phrasing, and metaphors preserved verbatim where they matter. **Not yet shaped.** Shaping into
> themes + timeline snippets is a later phase. Questions from `questions.md`.
>
> Session 1 — 2026-05-25.

---

## Q1 — Tell me about yourself

My name is Bill Thomas. I'm currently employed at athenahealth as a Senior Manager for Platform Data Solutions. My zone handles all the platform operations for athena — from implementation and integration right through terminations. I work really closely with our product departments. I've just personally transitioned into an IC role to operationalize AI, and I'm starting by working with our Salesforce data to get it ready for agentic workflows.

## Why Anthropic?

The only way I'd leave athenahealth — which has been a really great place for me to learn, grow, and develop my skills — would be for a chance to be closer to this amazing transformation we're all participating in.

My whole life has been leverage-seeking. I'm very interested in how things work, how things connect, and intelligence in general. Since really early — when I was much younger I read books like *Fluid Concepts and [Creative] Analogies* by Douglas [Hofstadter]. I can't pretend I understood everything in there, but those kinds of ideas — where did intelligence come from? Going back to being a kid with Dr. Seuss even — where did this intelligence come from? It's a topic I'm genuinely curious about to my core. It's a huge thread through my life.

When I look around at the different labs, Anthropic is the leading lab right now, and I respond to their ethos and their values and the way they go about things. I like that. I'd love to be part of a team where people are really, really smart and driving on something big and important. I think about it as fire, electricity, AI — it's a very basic, foundational thing that's driving everything. It would be great to be part of that. That's why Anthropic.

Other labs — really the only other places you could go would be OpenAI or Google. I like a lot of the OpenAI stuff, but the culture I don't think would be a good cultural fit for me personally; I don't see myself fitting into it. Google — there's just... and plus this is a very particular role that Anthropic is doing, a forward deployed engineer.

## Why FDE?

As interested as I am in how the models actually work — and I have a conceptual understanding of a lot of that, though not a mathematical one — that's not something I can necessarily contribute to. But I do understand engineering and systems. I love to be parachuted into a new place and have to come up to speed really quickly on how everything's connected — what moves what, what controls what — and then try to design something elegant to solve those problems. I get excited about that kind of work. I can stay up late for that kind of work. It really drives me and pushes me, keeps me going.

The through-line for me is continually trying to explore, learn, and develop more skills, following things I'm interested in.

**Career throughline (the path):** I didn't go to college. When I came out of the Marine Corps — I'd done plane mechanics [AV-8B Harrier] and couldn't imagine doing that forever — I had to make a living, so I started working construction. That led to driving equipment, which seemed like a better thing. Then I noticed the engineers walking around were all clean. So when I saw a job for a construction engineer, even though I wasn't really qualified, I applied and went after it hard — sort of like I'm going after this job now. I got it, and it changed the course. I learned engineering principles. I fell in love with the idea of engineering as a discipline. Four years of absolute immersion in building, engineering, design, construction, management. [Wight Consulting Engineers.]

Family is really important, and we wanted to live in Maine, closer to my wife's family at the time. So we decided to move even though there wasn't any real economic lure or jobs lined up. I was going to do construction management for [Cianbro], but that fell through. So I went to work for the only big company around, MBNA, and took whatever job I could — collections, which I absolutely hated. I looked for better roles, found one as a helpdesk operator, then climbed to [LAN] technician. We got reorganized and those roles were gone, so I ended up back in the credit department as a credit analyst and a licensed lender for a bit.

Then I took those skills, left, and started a consulting company taking care of small-business networks. From there I got involved with the school [Mid-Coast School of Technology] — a great opportunity. I took the engineering and the technology and we did some really great projects — the database projects — and I learned about data, solving a real problem the schools had. I taught in the classroom for a couple of years, worked with the robotics team, learned computer-aided design and manufacturing. I'd bought a CNC router that I had in my garage — again, all part of trying to get leverage, to get my ideas out in the world faster, to connect my brain to higher bandwidth and get things done faster and faster. We taught literacy in the content area — taught teachers how to teach literacy. I had a teaching certificate; I'd never gone to college, but there's a way to do that through career and technical education if you have professional experience.

I continued to consult for a while. I started training Brazilian jiu-jitsu and got really heavily involved. A friend who trained with me and I started a newsletter called BJJ Weekly, and we went hard at it — traveled all over the country filming experts, thousands of subscribers, millions of views on YouTube. That led to creating a sports nutrition brand, a natural recovery supplement for jiu-jitsu athletes, and I grew that. Eventually sold it to Pete, who actually created the [Origin] brand up here in Maine from that experience.

Then I went to work for athenahealth. They told me no at first — said I was overqualified — but I really needed a job and benefits. They brought me back because they were thinking about moving a new product's support up to Maine, to the Belfast office: Population Health. I asked what it was; they said "it's a data thing," and I said "great, I'll do it." They hired me basically to *be* the case team — a senior analyst. We did that and kept growing. Every time there was an opportunity in front of me I took the growth path. We went from case teams to real operational partners, baked into the service lines, drove the product feedback loop, really elevated the art. That's the common thread.

## Why join a team now (when robotics.press is solo)?

It has to be the right team. But think about everything I said — being able to be close to *that*. Imagine all the things I could learn in the next five years working at Anthropic, right in the middle of it. Imagine all the cool people I'd get to know. People pay crazy amounts of money for front-row seats at the Super Bowl. This whole thing is my Super Bowl. I'd maybe even pay to be there. I think it would be a lot of fun.

---

## Q2 — Walk me through 2–3 projects (deep): robotics.press

**Constraints / why it exists:** First, what's going to be economically viable in a post-AI future? Generic content is going to be so easy and cheap to make that it's not viable. I wanted to create something with value that would continue to accrue as I built it — that didn't require me personally to be involved, didn't need consulting clients or support tickets, didn't require packaging or shipping anything physical. Ideally a data product.

Language models were going to be agents; humans are going to rarely interact with most of the web very soon — it'll be 80/20 agents interacting. So I came up with the idea of **"data flowers"**: you grow, farm, cultivate little attractive data packets for the AI bees. That's all the search requests people will make — how does this work, what about that, who did what to whom — and you create a farm where the bees know to come get that data, and you become the *source* of that data. Wherever you can become the feed or a source of attention — especially human attention — there's value, there are ways to monetize.

**How to build it:** I wanted to scale it horizontally and vertically at the same time, and to see the limits of an individual controller — how fast and how wide could I go while maintaining quality standards? So you stick with basic engineering principles. For instance: **everything is data and everything is a loop.** Keep things very simple, very modular and configurable. Find the core primitives I've actually got to work with — what is the thing that needs to be stored, measured, modified, mangled? What's the object, what's the entity?

Then you test whether you truly understand the entities. You mock up rough solutions the way you think it is, poke at it, try to run it. A lot of times you find out you didn't understand it as well as you thought. So you ask questions: "That's great data — that broke funny, I didn't anticipate that breaking like that. Why did it break like that? Oh, that's why. Okay, how do we make it more robust, more durable? Can we make it simpler? Can we remove things? Do we really need that? Why are we doing that again?" You really interrogate the system so you fully understand the context. Then you make a measured bet — one thing, one direction at a time — always keeping in mind the outcome you want, without getting too wrapped up in *how* you get there. Keep a general aesthetic and direction of refinement: minimizing and durability.

**The Raptor metaphor:** Look at the SpaceX Raptor engines. The Raptor 1 looks like something from NASA in the '90s — tubes and pipes and wires everywhere. The second one, half of that is gone, much cleaner. The third one is almost organic, how efficient and refined it is. That's relentless engineering — relentless refinement toward the most elegant, durable, robust, inexpensive, transparent, modular solution you can get.

**Knowing when to stop:** You have to decide what's good enough. Once you get past 80/20 it starts to get expensive, and you can chase perfection forever — and then you get enamored of your own ideas, and sometimes the most pristine ideas don't actually work in reality. So you have to know when to stop. I learned when to stop from a guy who ran a big production machine shop in Maine — [Lie-Nielsen Toolworks]. When I was teaching CNC, he taught the adult-ed class. I asked him how they program the machines when running so many parts — I expected speeds and feeds. He said, "Oh man, I just get it pretty close, then I crank the machine until it slams stop." Basically you push the machine until it fails, back it off 10%, and you're good to go. That taught me a lot about real field engineering — Kalashnikov-style — as opposed to Swiss/Japanese style where everything's super precise (German too, very beautiful). It depends on what you're doing, where you need to go, and how much time — and you've got to know ahead of time, preferably, what you're doing.

---

## Q — Tell me about a decision you got wrong

I get decisions wrong all the time. I tend to minimize risk and maximize opportunity. [Technical ones: choosing the wrong architecture, stripping something down too far — need a specific example.]

A human one: when we were trying to build **federated builders** — getting operational people building, learning, teaching — I put a lot of energy in, and I thought a lot more people would be capable and willing to learn how to use the tools. I made a lot of noise about it. We got some going, but it was like trying to light a wet campfire — some sputter, some spark, and eventually a little flame took. But I could see I could keep doing that ad infinitum and never get the roaring fire we needed, because we needed to go fast. So we reshaped the project to be more educational and less inspirational — get folks as far as we can, but accept that's not the whole solution. I handed it off to a different part of the team to keep running, and I went over to an IC role to work on what I knew we actually needed: getting our data in the right shape to be acted on by agents.

---

---

# Session 2 — 2026-05-25

## robotics.press architecture — why 12 (really ~156) repos, structured that way

The repo count is some experimentation and some learnings. It's always trying to find the right level to sit in the harness — what work requires my attention. Most repos own a specific section of data and have ownership of a particular function. **Engine** is the biggest one — the core platform; I work a lot in that harness. I also work a lot in the **headquarters** harness, which has oversight over everything and is more operational. The **sandbox** harness is for experiments — for instance, I used it to develop our method of deploying Codex agents: we use the CLI to deploy Codex agents against our backlog tasks from the cloud harness, using my Codex subscription to build.

> Note: Bill says he has **156 repositories total, pretty much all of them "failures,"** and works actively in ~10 (usually the newest 10). Reconcile with the public "12+ repos under robotics-press-*" figure in `content.ts` during shaping.

## Agent-assisted dev model — task packets, worktrees, closeout memory

That's all trying to get as much agency as possible through the agents — I want to get as much work done as I can, get leverage. **Task packets:** well-scoped, one-to-three human-workday equivalents, well-bounded, with good definitions of done / acceptance criteria. They go on a backlog that's durable session to session, so it solves memory for complex projects. I have a central backlog across robotics.press that's had hundreds and hundreds of tickets in it — that's what lets me keep track, because I'm not familiar with the code at the module level necessarily, but I understand it at the systems level. That harness structure is what lets me do that.

Now I'm going one layer up: setting up agentic **"officers"** using the Anthropic managed-agents concept. Those officer agents have ownership of things like editorial — they reach down into the repo *as a tool, as a factory*, and plug into the system the underlying agents are running. That's why the thing is structured the way it is.

## Federation over central evangelism

That was more of an internal political thing at athena — it seemed like the way we could get the most leverage in a period where we didn't have very clear direction from leadership on operational AI. It was pragmatic.

## Greenfield from chaos — Pop Health

Pop Health is a product I didn't build. It was bought and integrated and wasn't well supported when it was integrated. What we did was build a support process around it — starting by documenting how it worked and how it didn't work, building the knowledge, then teaching people how to troubleshoot based on that knowledge, teaching them how to do the investigations, and then building an operational system around how we did support.

## Live coding rounds (parse URLs / KV store / scale to 100k rps)

Honestly, all of this is stuff I'd never do manually — I'd just take it to a model. As long as I can use a model, I'm good.

> **Critical clarification (Bill, emphatic):** "I never said I could code unaided. I've never coded unaided. I've only been able to generate code since AI." He is an **AI-native builder** — he does not hand-write code. His "I'm sure I could do this" means *with a model*, not by hand. Do not frame anything as "Bill coding unaided."

## System design rounds

Same approach — I'd drop it in and say: "What are the current best practices to scale this? What are the tools, the standard models and approaches, who are the main players? Give me a primer." From the primer I'd understand the basic concepts and tie it together. I wouldn't know how to off the top of my head — just give me a model and I can do any of this.

- **robotics.press at 1000×:** That's how it's designed — I designed it to scale. What breaks first? I'm not confident we could handle the *operational interactions* — 1000× traffic would drive a lot of interactions with all kinds of entities. Publishing is fine, but we wouldn't be able to handle the incoming email or whatever people wanted. I'd have to build and focus on that for a while.
- **Customer-facing agent in regulated/PHI:** Relatively easy — you put the agent out front and only feed it clean data you're okay with getting out. Put the agent in a pipeline.

## LLM & prompt engineering / hallucination / provenance

- **Detect & handle hallucination:** Data provenance, for one. Also give the agent **a positive path to failure** — a technique I use a lot; if it has a positive path to failure it's much less likely to hallucinate. Feed it more context, and don't ask it for something it can't produce. If it gives you a number, ask where it got the number from and make sure you're tracing it.
- **Tracing / mixed-model routing:** I trace at the **data level**. I've traced model *thinking* in the sandbox to understand how they think and fail — interesting — but in production I'm making sure I can trace back all the data. **If I have data provenance, there is no hallucination** — as long as provenance is working. "Don't quote a thing unless you can prove a thing." If you're going to quote a thing, tell me where you got it, and then you check that.
- **MCP server / shared tool registry as a leave-behind artifact:** *[Bill: "I don't know what kind of question that is." Didn't engage — flag to reframe or cut.]*

## Why does AI safety matter to you?

I know about the gray-goo problem. I think AI in its current form is more dangerous as a political/social weapon — the raw upheaval it's going to do to society. We need to understand that impact and prepare for it seriously.

I'm not necessarily afraid of agents coming to life and taking over. I don't think it's impossible, but the way current LLMs work it's pretty much impossible — there's no place for agency outside the inference loop. It's more like *us shining a light on the intelligence* than the intelligence acting; we have to feed the energy into it. I think there's probably a correlation between **energy per thought / energy per token** and how close to real intelligence we actually are. Right now it's too expensive for how smart it is — energy-wise — to be a stable process in the environment. Nature favors efficiency; current technology is very inefficient (more efficient than humans for a lot of tasks, but not at all efficient per unit of intelligence). That has to get much closer to humans before I worry too much. *[Bill: "I'm sure all this is well discussed, I don't really care about my idea about that."]*

## Safety-first decision — slowed down / said no

My data provenance: if we can't prove it, we say no. Another time — I did a legal review because I had a number scoring sites for vulnerability, and it turns out that's a pretty gray, maybe-can't-do-it area — putting a number on a site. So I said no to that and slowed down.

## Technical misjudgment that delayed a project

robotics.press is 156 repositories and pretty much every single one was a failure. The reason I can do what I do now is because I've had so many failures — I make fewer on the way toward a solution. I keep having to re-set-up repos because they got too cluttered, I made a wrong abstraction, I have to rebuild or reconnect something. It's constant — everything's always failing. That's my whole life: making technical misjudgments and learning. That's why I know how to do what I can do without ever going to school for it.

## Disagreement resolved with integrity

I managed people for years and coached. Once I got really irritated with a CSM (client success manager) who was over-the-top aggressive but also not very helpful. I was battling it out with this person. I went home, thought about it, and realized — I still didn't like the person, but the truth is they were *right*. The system wasn't working; it was putting them and their client in a bad spot. Even though it wasn't something my team was doing wrong, they were in a bad spot, so we ended up fixing it. *[specific issue TBD]*

## Do the simple thing that works — nailed it / overbuilt

I always overbuild, then drive down toward a simple thing. You never get the simple thing the first time — simplicity takes whittling and erosion and practice. I just know now: I don't overbuild for long before I get a sense that I'm overbuilt. Sometimes I'll make things too complicated before I even start to build.

## Workforce displacement (fire/electricity/AI → customer anxiety)

Everybody *should* be anxious about workforce displacement — it's a real thing. The truth is people have always had to be adaptable and find ways to add value to the organizations/societies they're part of (recently, financially — doing our jobs). We have to find ways for those folks to keep delivering value — but we can't keep jobs just because someone's doing them; the job itself has to provide value. We don't fully understand yet how AI will impact the workforce. I think there'll be far more opportunities for creative thinking and new kinds of roles. Every time we've feared a technology taking jobs, it's instead multiplied them — and the more powerful the technology, the bigger the multiplier. I don't see why AI would be different. It's a little faith-based, but I look to history: every powerful new technology displaces people from some role, but the new roles are plentiful and powerful.

## Healthcare-data-training — keep "democratized" from being unsafe?

*[Bill: "That's a dumb question." Didn't engage — flag to reframe or cut.]*

---

## Engineering design ethos / aesthetic / thinking & troubleshooting

**First move when you build something:** Define the scope and understand *why* I'm doing this — what's the point? That tells me how much effort it's worth; the bigger the point, the more effort. Then I go into a **firehose data dump** — whatever the thing is, I get as much information as I can and get immersed.

**How you decide what not to build / a recent "no":** I have a couple dozen project and business ideas on hold I'm not building and may never come back to. They come up so often that the hard part is *staying disciplined* — it's a practice. Especially in this tumultuous AI time I've made it a discipline to stay focused on robotics.press with little things on the side. Everything else I say no to. At work I say no to things that don't have enough value, or things I'm not the right person to do — but I get to choose a lot of what I work on, so it doesn't happen often.

**Good taste in engineering / beautiful vs ugly:** The core aesthetic in engineering is *elegance* — how simply and easily can you solve the problem at hand? The more simply you can do it, generally the more beautiful the solution. The **arch** solves so many structural problems but is an incredibly simple idea — and incredibly beautiful. The arch is the essence of engineering: simple, powerful, foundational. Ugly is something put together without care — neither aesthetically pleasing nor functionally elegant. It may or may not work, but no care was put in: sloppy, clunky, rickety, complicated, slippery.

**Simplest loop — simple enough vs. fragile:** Things don't become fragile *because* they're simple — they become more robust. That's why you go simple in the first place. They become fragile when you connect things, make things too big, make the strings too long or too complicated.

**Abstraction vs. repeating three lines:** I abstract everything. It's only a question of finding the *right level* of abstraction.

**What earns a comment:** I don't write code.

**Agent autonomy — what an agent does vs. what you keep hands on:** I try to let the agent do as much as it possibly can. Training-wheels approach: put the agent in the sandbox or slow-roll the output until I have reasonable confidence. The more deterministic an output needs to be, the more deterministic the solution should be. With the **officers** I'm actually testing the model's *judgment* — I give it a strategic objective and let it figure out how to get there from current status and available resources. The more agency, the less scaffolding, the more leverage — then I can just have a discussion instead of organizing everybody's toolbox. "Go get a toolbox. Why isn't your toolbox good enough?" That's what we're moving toward.

**Keeping cognitive control as it grows / losing the thread:** I lose the thread all the time because I'm constantly at that edge. I don't know that I have a great answer — it's day to day. I keep the objective simple; continually whittle things down so they're simple by nature; make everything available in the data; make loops self-correcting; make failures *loud*; make agents self-sustaining. And sometimes I just say, "I've been away for a while, no explanation needed — bring me back into the loop, give me the business context, the technical context, whatever," and I let the system ease me back into the harness. There's a very personal way of working inside a harness; for me it changes day to day.

**Max-leverage tension — where it's hardest:** It's worst when I've been operating too high in the stack and a problem surfaces, and I dig down to root cause and realize we did something really stupid — and I didn't know because I was a layer up when we did it. I wonder how that happened with all these things in place. But that's a great nugget: it usually surfaces more things — "if this is true, that must be true too" — and next thing I've got 8 tickets to work. That results in a pretty refined, robust system after a while.

**Troubleshooting — first 30 minutes:** I'm an expert-level troubleshooter. I find the ends, then link to the middle.

**Sanity-checking output (yours or a model's):** If you know the domain you've got a gut hunch — you can tell if the model's screwing around. You have to know the base numbers, have a base feel for the domain to trust the numbers; otherwise it has to be justified. Models' *core* is going to be stronger — they're much better at giving you a core understanding than an exact number. Think about the **trunk and the branches, not every individual leaf**, when getting stuff from a model. If you need the leaves, you should be augmenting somehow.

**Automate vs. manual:** I want to automate everything that doesn't require my personal attention — and even some that does: automate it, then give it my attention **async**. That's the next level of autonomy — queue something up so I can look at five things at once, or five in a row, without sitting and waiting for problems to surface.

**Ride the edge — managing the risk / safety net:** You've got to tell people where you are. Be transparent about what your system is actually doing. That's it.

**When is something done:** If I can hand it off to a stakeholder and walk away, it's done. Or when I stop using it.

**Strong opinion others disagree with:** The LLM is a better coder than you — and can be better at whatever it is you do than you are. You just don't know how to use it correctly.

---

## Coverage / still open

**Answered (sessions 1–2):** Recruiter set (tell me about yourself, why Anthropic, why FDE + full career throughline, why join a team now); HM project deep-dives (robotics.press architecture, agent-assisted dev model, federation, Pop Health greenfield); live-coding & system-design rounds (Bill's "use a model" stance + robotics 1000× + PHI agent); LLM/prompt eng (provenance, positive-path-to-failure, hallucination, tracing); culture/safety (why safety, safety-first decision, technical misjudgment, disagreement, simple-thing, workforce displacement); **all 16 engineering-ethos questions.**

**Still open / TODO:**
- Specific *technical* "decision I got wrong" — **per Bill, mine the robotics.press repo (engine, HQ, the backlog) for real examples.** He doesn't recall coding mistakes formatively: "things worked or didn't, I solved it in the moment and moved on. I don't retain it unless it's formative. I work at a very abstract level." So source these from the repo/backlog, not his memory.
- Specifics for the CSM disagreement story.
- robotics.press deeper architecture if wanted (data model / the "data flowers" pipeline mechanics).
- Reconcile **156 repos / ~10 active** with the public "12+ repos" figure.

**Flags for Bill (not shaping — heads-up):**
- He dismissed two questions ("MCP leave-behind"; "democratized vs unsafe") — reframe or cut.
- Live-coding / CodeSignal / system-design rounds **prohibit AI use during the interview**. Bill is an AI-native builder who does not hand-write code — so this is a real, honest tension for those specific rounds (positioning / role-loop reality), NOT something to paper over by claiming he can code unaided. Discuss with Bill how to handle.

**Big ethos threads (for shaping → timeline themes):** leverage-seeking (life spine); curiosity about intelligence (Hofstadter→Dr. Seuss→fire/electricity/AI); "everything is data, everything is a loop"; relentless refinement (Raptor); pragmatic stop-criteria (Lie-Nielsen "slam stop, back off 10%"); **the arch = essence of engineering / elegance = simplicity**; "abstract everything, find the right level"; **data provenance ⇒ no hallucination / "don't quote a thing unless you can prove a thing"**; positive path to failure; officers test *judgment*; agency↑ ⇒ scaffolding↓ ⇒ leverage↑; make failures loud / loops self-correcting; **trunk-and-branches not every leaf**; automate→async attention; transparency as the safety net; "the LLM is better at your job than you — you just don't know how to use it."
