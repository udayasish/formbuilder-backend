import dbConnect from "./db/index.js";
import { app } from "./app.js"



dbConnect()
.then(() => {

    //handle errors before listening
    app.on("error", (error) => {
        console.log("Error while listening !!!", error);
        throw error
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`App is listening on port: 8000`);
    })
})
.catch((error) => {
    console.log("Mongo DB Connection Failed !!!! ", error);

})


    

























/*(async () => {
        try {
            await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
            app.on("error", (error) => {
                console.log("ERRR: ", error);
                throw error
            })

            app.listen(process.env.PORT, () => {
                console.log(`App is listening on port ${process.env.PORT}`);
            })

        } catch (error) {
            console.error("Database connection FAILED: ", error);
            throw error
        }
    })()

*/
