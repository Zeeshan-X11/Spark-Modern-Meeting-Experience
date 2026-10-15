const server = process.env.REACT_APP_SERVER_URL ||
    (process.env.NODE_ENV === "development"
        ? "http://localhost:8000"
        : "https://apnacollegebackend.onrender.com");


export default server;
