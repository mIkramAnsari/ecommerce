module.exports = (fields, res) => {
    let errors = [];
    
  
    Object.keys(fields).forEach((key) => {
      if (!fields[key]) errors.push(key);
    });
  
    if (errors.length > 0)
      res.status(400).send({
        message: `These fields can not be empty ${errors}`,
      });
  
    if (errors.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  