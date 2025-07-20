import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';

const Quote = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const policyDetails = location.state || '';
  const [estimatedPremium, setEstimatedPremium] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const age = Number(data.age);
    const gender = data.gender;
    const duration = Number(data.duration);
    const coverage = Number(data.coverage);
    const smokingStatus = data.smoking;

    let baseRate = policyDetails.premiumRate;

    if (age > 50) baseRate *= 1.5;
    else if (age > 35) baseRate *= 1.2;

    if (smokingStatus === 'smoker') baseRate *= 1.3;

    if (gender === 'female') baseRate *= 0.9;

    const coverageUnits = coverage / 100000;

    const totalAnnualPremium = baseRate * coverageUnits;
    const monthlyPremium = totalAnnualPremium / 12;


    setEstimatedPremium({
      monthly: monthlyPremium.toFixed(2),
      annual: totalAnnualPremium.toFixed(2),
      duration,
      coverage,
    });
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold text-blue-950 mt-6 pt-6">
        Get Estimated Quote
      </h1>
      <h1 className="text-xl font-bold text-center text-blue-950 mt-2 pt-2">
        Policy Name: {policyDetails.title}
      </h1>

      <section className="p-6 my-6 py-6">
        <form onSubmit={handleSubmit(onSubmit)} className="container flex flex-col mx-auto space-y-12">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">
            <div className="space-y-2 col-span-full lg:col-span-1">
              {estimatedPremium && (
                <div className="bg-white p-4 rounded shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Estimated Premium</h3>
                  <p>Monthly Premium: <strong>৳ {estimatedPremium.monthly}</strong></p>
                  <p>Annual Premium: <strong>৳ {estimatedPremium.annual}</strong></p>
                
                </div>
              )}
            </div>

            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
  <label htmlFor="age" className="text-sm">Age</label>
  <input
    type="number"
    {...register('age', {
      required: true,
      min: policyDetails.minAge,
      max: policyDetails.maxAge
    })}
  placeholder={`Min age: ${policyDetails.minAge}, Max age: ${policyDetails.maxAge}`}

    className="w-full rounded-md border p-2"
  />
  {errors.age && (
    <p className="text-red-500 text-sm">
      Valid age required ({policyDetails.eligibility})
    </p>
  )}
</div>


              <div className="col-span-full sm:col-span-3">
                <label htmlFor="gender" className="text-sm">Gender</label>
                <select
                  {...register('gender', { required: true })}
                  className="w-full rounded-md border p-2"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">Gender is required</p>}
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="coverage" className="text-sm">Coverage Amount (BDT)</label>
                <input
                  type="number"
                  {...register('coverage', {
                    required: true,
                    min: policyDetails.minCoverage,
                    max: policyDetails.maxCoverage
                  })}
                  placeholder={`min-${policyDetails.minCoverage}
                   max-${policyDetails.maxCoverage}`}
                  className="w-full rounded-md border p-2"
                />
                {errors.coverage && <p className="text-red-500 text-sm">Enter valid coverage amount</p>}
              </div>

              <div className="col-span-full">
                <label htmlFor="duration" className="text-sm">Duration (Years)</label>
                <input
                  type="number"
                  {...register('duration', { required: true, min: 1, max: 30 })}
                  placeholder="Duration"
                  className="w-full rounded-md border p-2"
                />
                {errors.duration && <p className="text-red-500 text-sm">Enter duration between 1-30 years</p>}
              </div>

              <div className="col-span-full sm:col-span-3">
                <label className="text-sm block mb-2">Smoking Status</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="non-smoker"
                      {...register('smoking', { required: true })}
                    />
                    <span>Non-Smoker</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="smoker"
                      {...register('smoking', { required: true })}
                    />
                    <span>Smoker</span>
                  </label>
                </div>
                {errors.smoking && <p className="text-red-500 text-sm">Please select smoking status</p>}
              </div>

              <div className="col-span-full flex justify-center items-center gap-6 mt-6">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-blue-700 to-blue-600 hover:bg-gradient-to-br rounded-lg text-sm px-5 py-2.5"
                >
                  Get Your Insurance Premium
                </button>

                <NavLink
                  to="/application"
                  state={{ policyDetails, estimatedPremium }}
                  className="text-white bg-gradient-to-r from-blue-700 to-blue-600 hover:bg-gradient-to-br rounded-lg text-sm px-5 py-2.5"
                >
                  Apply For Policy
                </NavLink>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default Quote;
