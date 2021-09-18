const express = require('express')
const app = express();
const port = 5000;
const routerV1 = require('./routes/index')

app.use(express.json())

// // app.use("/path", router)
app.use("/api/v1", routerV1)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});