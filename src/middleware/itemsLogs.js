export const logRequest = (req, res, next) => {
  console.log(`Запит: ${req.method} ${req.originalUrl} - ${req.rawHeaders[1]}`);
  console.log("request log >>> ", JSON.stringify(req.body));
  next();
};
