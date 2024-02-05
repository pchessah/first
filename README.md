# First FinTech Mobile App

## Task Overview

This mobile application serves as a solution for First FinTech, enabling users to register, log in, view available services, subscribe to services, and check their subscribed services. The application should be developed according to the provided flowchart and integrate with the listed APIs. Note that the APIs (excluding login and registration) require authorization, and only authenticated users can access them.

## How to Run Application Locally

### Prerequisites

1. **Node.js and npm:**
   - [Download and install Node.js](https://nodejs.org/).
   - npm is included with Node.js, so a separate installation is not required.

2. **Ionic CLI:**
   - Install the Ionic CLI globally using npm:
     ```bash
     npm install -g @ionic/cli
     ```

3. **Git (Optional):**
   - [Download and install Git](https://git-scm.com/). (Optional but recommended for version control)

### Steps

1. Git clone the repo via the command: `git clone https://github.com/pchessah/first.git`
2. Open the terminal pointed to the local repository.
3. Run `npm install`.
4. To run the app, execute `ionic serve`.

## Build Android App

Make sure you have Android Studio installed.

Run the following commands in the terminal pointed to the project:

1. `npm install @capacitor/android`
2. `npx cap add android`
3. `ionic capacitor sync android`
4. `npx cap sync android`
5. `npx cap open android`
