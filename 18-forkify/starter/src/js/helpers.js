import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(
          `Request took too long! Timeout after ${s} ${
            s > 1 ? 'second' : 'seconds'
          }`
        )
      );
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData), // converts to JSON
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // whoever wins is the winner (resolved vs reject)
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // so it's NOT caught here (promise returned from here will reject)
  }
};

export const AJAXSpoonacular = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // whoever wins is the winner (resolved vs reject)
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err; // so it's NOT caught here (promise returned from here will reject)
//   }
// };

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData), // converts to JSON
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // whoever wins is the winner (resolved vs reject)
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export function normalizeIngredient(obj) {
  const qty = obj.quantity || 1; // fallback
  const unit = obj.unit || ''; // allowed empty
  let desc = obj.description.toLowerCase();

  // remove "or", parentheses, commas
  desc = desc.replace(/\([^)]*\)/g, '');
  desc = desc.replace(/ or .*/g, '');
  desc = desc.replace(/,/g, '');

  // crude singularization
  if (desc.endsWith('s')) desc = desc.slice(0, -1);

  return `${qty} ${unit} ${desc}`.trim();
}
