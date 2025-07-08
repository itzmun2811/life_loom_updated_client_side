import React, { useState } from 'react';
import { NavLink } from 'react-router';

const Quote = () => {
 const [estimatedPremium, setEstimatedPremium] = useState(null);

   const handleSubmit =(e)=>{
    e.preventDefault()
    console.log('submitted')
    const form=e.target;
    const age = Number(form.age.value);
    const gender=form.gender.value;
   const duration = Number(form.duration.value);
    const coverage = Number(form.coverage.value);
    const smokingStatus=form.smoking.value;
    console.log(age,gender,duration,coverage,smokingStatus)

    let baseRate = 100;

    if (age > 50) baseRate *= 1.5;
    else if (age > 35) baseRate *= 1.2;

    if (smokingStatus === 'smoker') baseRate *= 1.3;

    if (gender === 'female') baseRate *= 0.9;


    const totalAnnualPremium = baseRate * (coverage * 100000) / 100000;

    const monthlyPremium = totalAnnualPremium / 12;

    setEstimatedPremium({
      monthly: monthlyPremium.toFixed(2),
      annual: totalAnnualPremium.toFixed(2),
      duration: duration,
    });




   }
 return (
        <div>
            quote

<section className="p-6 dark:bg-gray-100 dark:text-gray-900">
	<form noValidate="" onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
			<div className="space-y-2 col-span-full lg:col-span-1">
			
{estimatedPremium && (
            <div className="bg-white p-4 rounded shadow-md text-gray-900 dark:text-gray-900 dark:bg-gray-200 mt-6">
              <h3 className="text-lg font-semibold mb-2">Estimated Premium</h3>
              <p>Monthly Premium: <strong>৳ {estimatedPremium.monthly}</strong></p>
              <p>Annual Premium: <strong>৳ {estimatedPremium.annual}</strong></p>
              <p>Duration: <strong>{estimatedPremium.duration} years</strong></p>
            </div>
          )}



			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="age" className="text-sm">Age</label>
					<input name='age' required id="age" type="number"   placeholder="Age" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-3">
  <label htmlFor="gender" className="text-sm">Gender</label>
  <select
    id="gender"
    required name='gender'
    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
  >
    <option value="">Select gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="coverage" className="text-sm">Coverage Amount(in Lakhs BDT)</label>
					<input id="coverage" type="number" required name='coverage'
                     placeholder="Coverage Amount" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full">
					<label htmlFor="duration" className="text-sm">Duration(years/monthly)</label>
					<input id="duration" type="number" required name='duration'
                    placeholder="duration" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				
		<div className="col-span-full sm:col-span-3">
  <label className="text-sm block mb-2">Smoking Status</label>
  <div className="flex items-center gap-6">
    <label className="flex items-center gap-2">
      <input
        type="radio"
       name='smoking'
       value='non-smoker'
        className="accent-violet-600"
      />
      <span>Non-Smoker</span>
    </label>
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name='smoking'
        value='smoker'
        className="accent-violet-600"
      />
      <span>Smoker</span>
    </label>
  </div>

  <div className="col-span-full flex justify-center items-center gap-6 mt-6">
  <button
    type="submit"
    className="text-white bg-gradient-to-r from-blue-700 to-blue-600 hover:bg-gradient-to-br
               focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800
               font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  >
    Get Your Insurance Premium
  </button>

  <NavLink
    to="/application"
    className="text-white bg-gradient-to-r from-blue-700 to-blue-600 hover:bg-gradient-to-br
               focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800
               font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block"
  >
    Apply For Policy
  </NavLink>
</div>
</div>

			</div>
         
		</fieldset>


 
	
       
		
	</form>
</section>






        </div>
    );
};

export default Quote;