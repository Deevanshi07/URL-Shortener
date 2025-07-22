URL Shortener 
A simple URL shortener built with Node.js, Express, and MongoDB.

Features
- Shortens long URLs
- Redirects users to original URLs via short codes
- Stores URL mappings in MongoDB

Clone the repository and install dependencies:
git clone https://github.com/Deevanshi07/URL-Shortener.git
cd URL-Shortener
npm install

Start the server
npm start
The server will start on http://localhost:8001

Make a post request 
POST http://localhost:8001/url
Content-Type: application/json

{
  "url": "https://example.com"
}

Response: 
{
  "id": "abc123xyz"
}

Redirect to Original URL
Visit in your browser:
http://localhost:8001/abc123xyz
This will redirect to the original long URL.
