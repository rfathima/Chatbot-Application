const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Sept@2015', // Replace with your MySQL password
  database: 'chatbot_db' // Replace with your database name
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Endpoint to save question and answer
app.post('/api/chat', (req, res) => {
  const { user, question, answer } = req.body;
  const date = new Date();

  const query = 'INSERT INTO chat_history (user, question, answer, date) VALUES (?, ?, ?, ?)';
  db.query(query, [user, question, answer, date], (err, result) => {
    if (err) {
      console.error('Error saving to database:', err);
      return res.status(500).send('Server error');
    }
    res.send('Chat history saved');
  });
});

// Endpoint to fetch chat history
app.get('/api/chat', (req, res) => {
  const query = 'SELECT * FROM chat_history ORDER BY date DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching from database:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});

// Endpoint to fetch monthly statistics for questions and users
app.get('/api/monthly-stats', (req, res) => {
  const query = `
    SELECT
    DATE_FORMAT(date, '%b') AS month,
    COUNT(DISTINCT question) AS questionCount,
    COUNT(DISTINCT user) AS userCount
    FROM
    chat_history
    GROUP BY
    month, DATE_FORMAT(date, '%m')
    ORDER BY
    DATE_FORMAT(date, '%m')
    `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching monthly stats:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});

// Endpoint to fetch the total number of questions and users
app.get('/api/total-stats', (req, res) => {
  const query = `
    SELECT 
      COUNT(DISTINCT question) AS totalQuestions,
      COUNT(DISTINCT user) AS totalUsers
    FROM chat_history`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total stats:', err);
      return res.status(500).send('Server error');
    }
    res.json(results[0]); // Assuming only one row is returned, so we send the first row
  });
});

// app.get('/api/current-week-stats', (req, res) => {
//     const query = `
//       SELECT
//         DAYNAME(date) as day,
//         COUNT(DISTINCT question) AS questionCount,
//         COUNT(DISTINCT user) AS userCount,
//         DAYOFWEEK(date) as dayOfWeek
//       FROM chat_history
//       WHERE YEARWEEK(date, 1) = YEARWEEK(CURDATE(), 1)
//       GROUP BY day, dayOfWeek
//       ORDER BY dayOfWeek`;
  
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error('Error fetching current week stats:', err);
//         return res.status(500).send('Server error');
//       }
//       res.json(results);
//     });
//   });

app.get('/api/weekly-stats', (req, res) => {
    const isCurrentWeek = req.query.isCurrentWeek === 'true';
  
    let query = `
      SELECT
        DAYNAME(date) as day,
        COUNT(DISTINCT question) AS questionCount,
        COUNT(DISTINCT user) AS userCount
      FROM chat_history
      WHERE YEARWEEK(date, 1) = YEARWEEK(CURDATE(), 1)
      GROUP BY DAYNAME(date)
      ORDER BY MIN(DAYOFWEEK(date))`; // Use MIN() or MAX() to ensure ORDER BY is compatible with ONLY_FULL_GROUP_BY mode
  
    if (!isCurrentWeek) {
      query = `
        SELECT
          DAYNAME(date) as day,
          COUNT(DISTINCT question) AS questionCount,
          COUNT(DISTINCT user) AS userCount
        FROM chat_history
        WHERE YEARWEEK(date, 1) = YEARWEEK(CURDATE(), 1) - 1
        GROUP BY DAYNAME(date)
        ORDER BY MIN(DAYOFWEEK(date))`; // Use MIN() or MAX() to ensure ORDER BY is compatible with ONLY_FULL_GROUP_BY mode
    }
  
    db.query(query, (err, results) => {
      if (err) {
        console.error(`Error fetching ${isCurrentWeek ? 'current' : 'last'} week stats:`, err);
        return res.status(500).send('Server error');
      }
      res.json(results);
    });
});
 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
