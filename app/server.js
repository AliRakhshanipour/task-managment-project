const { AllRoutes } = require("./router/router");

module.exports = class Application {
  #express = require("express");
  #app = this.#express();
  //constructor method of Application
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createRoute();
    this.createServer(PORT);
    this.errorHandler();
  }

  // method for primary configs of application
  configApplication() {
    const path = require("path");
    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
  }
  //method for creating server with http package
  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(PORT, () =>
      console.log(`server running on http://localhost:${PORT}`)
    );
  }
  //method for config database !!
  configDatabase(DB_URL) {
    const mongoose = require("mongoose");
    //use ternary operators for error handling in this method
    mongoose.connect(DB_URL, (error) =>
      error
        ? (() => {
            throw error;
          })()
        : console.log("connected to database")
    );
  }
  //method for error handling !
  errorHandler() {
    //for 404 error case !!
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "page not found",
      });
    });
    // for public error handling

    this.#app.use((error, req, res, next) => {
      // nullish => we use '?'
      //because if we don't we are going to get error if error.status error.message be 'undefined'!!
      const status = error?.status || 500;
      const message = error?.message || "InternalServerError";
      return res.status(status).json({
        status,
        success: false,
        message,
      });
    });
  }
  // method for ami route of application
  createRoute() {
    this.#app.get("/", (req, res, next) => {
      return res.json({
        message: "this is a new express application :)",
      });
    });

    // we use this middleware for error handling to be easier!!
    //in every route we should do tryCatch ,
    // but this middleware will handle that , we don't need to do try in every route!'
    this.#app.use(AllRoutes);
    // this.#app.use((error, req, res, next) => {
    //   try {
    //   } catch (error) {
    //     next(error);
    //   }
    // });
  }
};
