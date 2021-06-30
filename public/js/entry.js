const entryFormHandler = async (unpaidHours, unpaidSalary) => {
  const email = document.querySelector('#email-entry').value.trim();
  const industry = document.querySelector('#industry-entry').value;
  const start = document.querySelector('#start-entry').value;
  const end = document.querySelector('#end-entry').value;
  const salary = document.querySelector('#salary-gross').value.trim();
  const lunch = document.querySelector(
    'input[name="lunchOptions"]:checked').value;
  if (email && industry && start && end && lunch && salary) {
    const response = await fetch('/api/entry', {
      method: 'POST',
      body: JSON.stringify({
        email,
        industry,
        start,
        end,
        lunch,
        salary,
        unpaidHours,
        unpaidSalary,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const responseBody = await response.json();
      document.location.href = `/results/${responseBody.entryResult.id}`;
    } else {
      alert(response.statusText);
    }
  }
};


const entryFormHandlerPart = async (unpaidHours, unpaidSalary) => {
  const email = document.querySelector('#email-entry-part').value.trim();
  const industry = document.querySelector('#industry-entry-part').value;
  const salary = document.querySelector('#salary-gross-part').value.trim();

  if (email && industry && salary) {
    const response = await fetch('/api/entry', {
      method: 'POST',
      body: JSON.stringify({
        email,
        industry,
        salary,
        unpaidHours,
        unpaidSalary,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const responseBody = await response.json();
      document.location.href = `/results/${responseBody.entryResult.id}`;
    } else {
      alert(response.statusText);
    }
  }
};

const calculate = async () => {
  const start = document.querySelector('#start-entry').value;
  const end = document.querySelector('#end-entry').value;
  const salary = document.querySelector('#salary-gross').value.trim();
  const extra = document.querySelector('input[name="extraTime"]:checked').value;
  const lunch = document.querySelector(
    'input[name="lunchOptions"]:checked'
  ).value;
  event.preventDefault();
  if (extra === '15') {
    var extraTimeRes = 0.25 * 365;
  } else if (extra === '30') {
    var extraTimeRes = 0.5 * 365;
  } else if (extra === '45') {
    var extraTimeRes = 0.75 * 365;
  } else if (extra === '60') {
    var extraTimeRes = 1 * 365;
  } else {
    var extraTimeRes = 0;
  }
  if (end > start) {
    var oneDay = (end - start) + 24 - 8;
    if (oneDay < 0) {
      alert('Please enter full time hours');
    } else if (lunch === 'yeslunch') {
      let unpaidHours = (oneDay * 230) + extraTimeRes;
      let hourlySalary = (salary / 260) / 7.6;
      let unpaidSalary = hourlySalary * unpaidHours;
      return entryFormHandler(
        parseInt(unpaidHours.toFixed(0)),
        parseInt(unpaidSalary.toFixed(0))
      );
    } else {
      var oneDayNew = oneDay + 0.5;
      let unpaidHours = (oneDayNew * 230) + extraTimeRes;
      let hourlySalary = (salary / 260) / 7.6;
      let unpaidSalary = hourlySalary * unpaidHours;
      return entryFormHandler(
        parseInt(unpaidHours.toFixed(0)),
        parseInt(unpaidSalary.toFixed(0))
      );
    }
  } else {
    var oneDay = (end - start) - 8;
    if (oneDay < 0) {
      alert('Please enter full time hours');
    } else if (lunch === 'yeslunch') {
      let unpaidHours = (oneDay * 230) + extraTimeRes;
      let hourlySalary = (salary / 260) / 7.6;
      let unpaidSalary = hourlySalary * unpaidHours;
      return entryFormHandler(
        parseInt(unpaidHours.toFixed(0)),
        parseInt(unpaidSalary.toFixed(0))
      );

    } else {
      var oneDayNew = oneDay + 0.5;
      let unpaidHours = (oneDayNew * 230) + extraTimeRes;
      let hourlySalary = (salary / 260) / 7.6;
      let unpaidSalary = hourlySalary * unpaidHours;
      return entryFormHandler(
        parseInt(unpaidHours.toFixed(0)),
        parseInt(unpaidSalary.toFixed(0))
      );

    }
  }
}



const calculatePart = async () => {
  const paid = document.querySelector('#paid-hours').value;
  const actual = document.querySelector('#actual-hours').value;
  const salary = document.querySelector('#salary-gross-part').value.trim();
  const extra = document.querySelector('input[name="extraTime"]:checked').value;

  event.preventDefault();

  if (extra === '15') {
    var extraTimeRes = 0.25 * 365;
  } else if (extra === '30') {
    var extraTimeRes = 0.5 * 365;
  } else if (extra === '45') {
    var extraTimeRes = 0.75 * 365;
  } else if (extra === '60') {
    var extraTimeRes = 1 * 365;
  } else {
    var extraTimeRes = 0;
  }



  let unpaidHours = ((actual - paid) * 46) + extraTimeRes
  let hourlySalary = (salary / 52) / paid;
  let unpaidSalary = hourlySalary * unpaidHours;
  return entryFormHandlerPart(
    parseInt(unpaidHours.toFixed(0)),
    parseInt(unpaidSalary.toFixed(0))
  );


}








// console.log(
//   unpaidHours.toFixed(0),
//   hourlySalary.toFixed(0),
//   unpaidSalary.toFixed(0),
//   email,
//   "Extra:",
//   extra,
//   "ExtratimeRes",
//   extraTimeRes,
//   lunch,
//   salary,
//   industry,
//   start,
//   end
// );

document.querySelector('#entry-form-full').addEventListener('submit', calculate);
document.querySelector('#entry-form-part').addEventListener('submit', calculatePart);