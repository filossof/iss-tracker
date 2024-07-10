# ISS Tracker Backend

This is the backend service for the ISS Tracker project. It provides APIs to get information about the International Space Station's (ISS) current location and the country it is currently over.

## Features

- **API to get the list of countries**: Returns all country names from the dataset.
- **API to get the current location of the ISS**: Returns the name of the country the ISS is currently above or 'Ocean' if not above a country.
- **API to get the current UTM coordinates of the ISS**: Returns the UTM coordinates of the ISS.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/filossof/iss-tracker.git
   cd iss-tracker
   ```

2. Install the dependencies
   ```bash
   npm install
   ```

### Running the Server

To start the server in development mode:

```bash
npm start

```

### API Endpoints

- GET /countries: Returns all country names from the dataset.
- GET /iss: Returns the name of the country the ISS is currently above or 'Ocean' if not above a country.
- GET /utm: Returns the UTM coordinates of the ISS.

### Project Structure

iss-tracker/
├── src/
│ ├── data/
│ │ └── countries.json
│ ├── routes/
│ │ ├── countries.ts
│ │ ├── iss.ts
│ │ └── utm.ts
│ ├── app.ts
│ └── server.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
