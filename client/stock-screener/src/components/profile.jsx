// import React, { useState } from 'react';

// function Profile() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobno, setMobNo] = useState('');
//   const [gender, setGender] = useState('');
//   const [DOB, setDOB] = useState('');
//   const [country, setCountry] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [occupation, setOccupation] = useState('');
//   const [industry, setIndustry] = useState('');
//   const [annualIncome, setAnnualIncome] = useState('');

//   const handleSaveProfile = () => {
//     // You can implement logic here to save the user profile data
//     // to your backend or perform any required actions.
//     // Example API call:
//     // const userData = {
//     //   name,
//     //   email,
//     //   mobno,
//     //   gender,
//     //   DOB,
//     //   country,
//     //   state,
//     //   city,
//     //   pincode,
//     //   occupation,
//     //   industry,
//     //   annualIncome,
//     // };
//     // Call your API to save the data here.
//   };

//   return (
//     <div className="container">
//       <h2>User Profile</h2>
//       <form>
//         {/* Render input fields for each profile attribute */}
//         {/* Example: */}
//         <label>Name:</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         {/* Repeat similar input fields for other attributes */}
//         {/* ... */}
//         <button type="button" onClick={handleSaveProfile}>
//           Save Profile
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Profile;
