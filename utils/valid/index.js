const message = (data) => {
  if (data.phone === undefined) {
    return false;
  }

  if (data.email === undefined) {
    return false;
  }

  if (data.phone.length !== 12) {
    return false;
  }

  return true;
};

const verification = (data) => {
  if (data.code === undefined) {
    return false;
  }

  if (data.code.length !== 6) {
    return false;
  }

  if (data.email === undefined) {
    return false;
  }

  if (!data.email) {
    return false;
  }

  return true;
};

module.exports = { message, verification };
