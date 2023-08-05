const express = require('express');
const app = express()
const PORT = 5000;

require('./db');
app.get('/', (req, res) => {
    res.send("hello world!");
})
// form submit  karya [a79 karya pa6i cors na error mate
app.use((req ,res ,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json())
app.use('/api', require("./routes/UserCreate"));
app.use('/api', require("./routes/DisplayData"));
app.listen(PORT, () => {
    console.log(`listning on port ${PORT}`)
})

// form submit karya pa6i cors na error mate
// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// })