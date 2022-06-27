const set = (keyName, keyValue, expiry) => {
  const data = {
      value: keyValue, 
      expired: expiry ? Date.now() + (expiry * 1000) : null,  
  }

  localStorage.setItem(keyName, JSON.stringify(data));
};

const get = (keyName) => {
  const data = localStorage.getItem(keyName);
  if (!data) {    
      return false;
  }

  const item = JSON.parse(data);

  if (item.expired) {
    if (Date.now() > item.expired) {
      localStorage.removeItem(keyName);
      return false;
    }
  }

  return item.value;
};

export default {
  set, 
  get
}