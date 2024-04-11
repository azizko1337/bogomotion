const ironOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME || "iron-session",
  password: process.env.SESSION_SECRET || "asd",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export default ironOptions;
