# Express API for MongoDB

This API is built for Discord server verification using a Roblox game. It uses Express.js, MongoDB, and other supporting libraries to manage user data securely and efficiently.

---

## 🚀 Installation

Install the required dependencies:

```bash
npm install node-fetch
npm install mongoose --save
npm install express --save
npm install dotenv
```

---

## ⚙️ Environment Variables

Create a `.env` file and define the following variables:

```env
mongodb=
api=
WEBHOOK=
```

---

## 🛠️ Customizing the Data Schema

To use a custom schema, navigate to the `data` folder and modify or replace the existing schema file.

**IMPORTANT:**  
If you make changes to the schema or file names, update the following files accordingly:
- `routes/api.js`
- `dataHandler.js` (especially lines 4 and 5)

If you no longer need `dataHandler.js` (e.g., you're not handling deletions or schema swaps), you can remove it.

---

## 📡 API Endpoints

### `POST /api/createLogs`

**Headers:**
```
x-api-key: YOUR_API_KEY
```

**Body:**
```json
{
  "RobloxID": "string",
  "DiscordID": "string"
}
```

**Response Codes:**
- `200`: Success
- `201`: Success – Data created
- `300`: Already verified
- `400`: Invalid API key
- `401`: Missing input
- `402`: Roblox ID already in use
- `404`: General error

---

### Other Endpoints

- `GET /api/getI` – Requires `DiscordID`
- `GET /api/getInfo` – Requires `RobloxID`
- `POST /api/postDelete` – Requires `RobloxID`
- `POST /api/postVerify` – Requires `RobloxID`

**Headers:**
```
x-api-key: YOUR_API_KEY
```

**Body Examples:**
```json
{
  "DiscordID": "string"
}
```
or
```json
{
  "RobloxID": "string"
}
```

**Response Codes:**
- `200`: Success
- `202`: No data found
- `400`: Invalid API key
- `401`: Missing input
- `404`: General error

---

## ❗ Notes

🧪 **This is my first Express.js application.**  
If you encounter any issues, please report them using the GitHub Issues tab.

---

## 📁 Project Structure (Optional)

```
.
├── data/
│   └── [yourSchema].js
├── routes/
│   └── api.js
├── dataHandler.js
├── .env
├── server.js
└── README.md
```
```
