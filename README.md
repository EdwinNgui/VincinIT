# VelocIT
## Inspiration
VelocIT was inspired by the difficulties with using career fair apps like the popular, Handshake. We wanted something to build more meaningful connections and something that would create the career fair process much more effective.

## What it does
VelocIT is designed to streamline the career fair process in many aspects. Firstly, VelocIT uses geolocation to locate nearby recruiters and recommends an opening line to help break the ice. This application has a profile page that lists the user's marketable skills and uses Groq AI to help summarize these skills into a pitch that can be given to recruiters. Lastly, VelocIT has a history page where the user is given a summary of all the companies that were met with and uses Groq AI to help summarize the best actions moving forward from the career fair.

## How we built it
We built VelocIT using a few powerful iOS development solutions. We built on react native expo go to allow for iOS development on windows and we used tools like Firebase and Groq to add needed features to this application. We utilized geolocation and frequent posts to firebase to allow users to discover each other, with Groq complementing each conversation with tailored AI responses for each user.

## Challenges we ran into
The biggest challenge we had was building an iOS app while only having 4 windows PCs. Having limited packages was a direct result of this as only a few pre compiled packages work with it. Originally we tried to use bluetooth low energy (BLE) to find nearby users and experiment with mongoDB atlas. However we changed this to use expo-location and firebase for this functionality.

## Accomplishments that we're proud of
Creating a fully functional app using location services to connect users with recruiters based on a challenge we faced in recruitment.

## What we learned
We learned iOS development, firebase user management, Groq generative AI inferences, and expo-location to communicate using geolocation.

## What's next for VelocIT
Implementing a virtual queue to streamline the waiting process is planned. As well as AI based matchmaking based on resume to recommend companies to the user
