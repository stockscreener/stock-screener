import React, { useState } from 'react';

function UserProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobNo, setMobNo] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDOB] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [occupation, setOccupation] = useState('');
    const [industry, setIndustry] = useState('');
    const [annualIncome, setAnnualIncome] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform any validation and submission logic here
    };

    return (


        
        
        <div className="container p-8 mt-6 col-md-6">
            <div className="col">
            <div className="row justify-content-center">
            <div className="col-md-6">
            <form onSubmit={handleSubmit}>

                <div className="card shadow text-dark p-5">
                    <h2 className="text-center">Profile</h2>
                    <div className="mb-3">
                    <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                 </div>
                 <div className="mb-3">
                    <label>Email:</label>
                <input type="text" value={email}   autoFocus
                            autoComplete="email" onChange={(e) => setName(e.target.value)} />
                 </div>
                 <div className="mb-3">
                    <label>Mobile No:</label>
                <input type="text" value={mobNo} onChange={(e) => setName(e.target.value)} />
                 </div>
               
                   <div className="mb-3">
                                <label>Gender:</label>
                              
                                    <input type="radio" className="form-check-input" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                                    <label className="form-check-label">Male</label>
                                
                               
                                    <input type="radio" className="form-check-input" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                                    <label className="form-check-label">Female</label>
                             
                                    <div style={{ padding: '0 55px' }}>
                                    <input type="radio" className="form-check-input" name="gender" value="other" checked={gender === 'other'} onChange={(e) => setGender(e.target.value)} />
                                    <label className="form-check-label">Other</label>
                                    </div>
                            </div>
                 <div className="mb-3">
                    <label>DOB:</label>
                <input type="text" value={dob} onChange={(e) => setName(e.target.value)} />
                 </div>
                 <div className="mb-3">
                    <label>Country:</label>
                <input type="text" value={country} onChange={(e) => setName(e.target.value)} />
                 </div>
                 <div className="mb-3">
                    <label>State:</label>
                <input type="text" value={state} onChange={(e) => setName(e.target.value)} />
                 </div>
                 <div className="mb-3">
                    <label>City:</label>
                <input type="text" value={city} onChange={(e) => setName(e.target.value)} />
                 </div>
                 <div className="mb-3">
                    <label>Pincode:</label>
                <input type="text" value={pincode} onChange={(e) => setName(e.target.value)} />
                 </div>
                 <div className="mb-3">
                    <label>Occupation:</label>
                <input type="text" value={occupation} onChange={(e) => setName(e.target.value)} />
                 </div>
                 <div className="mb-3">
                    <label>Industry:</label>
                <input type="text" value={industry} onChange={(e) => setName(e.target.value)} />
                 </div>
                 <div className="mb-3">
                    <label>Annual Income:</label>
                <input type="text" value={annualIncome} onChange={(e) => setName(e.target.value)} />
                 </div>
               
                    
                    <div className="mb-3 form-check">
                   
                    </div>
                    <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary me-2">Save</button>
                                <button type="button" className="btn btn-secondary">Cancel</button>
                            </div>
                   
                    </div>
                   
                    </form>
                    </div>
                </div>
            </div>
            <div className="col"></div>
        </div>
       
    );
}

export default UserProfile;







// import React, { useState } from 'react';

// function UserProfile() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [mobNo, setMobNo] = useState('');
//     const [gender, setGender] = useState('');
//     const [dob, setDOB] = useState('');
//     const [country, setCountry] = useState('');
//     const [state, setState] = useState('');
//     const [city, setCity] = useState('');
//     const [pincode, setPincode] = useState('');
//     const [occupation, setOccupation] = useState('');
//     const [industry, setIndustry] = useState('');
//     const [annualIncome, setAnnualIncome] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // You can perform any validation and submission logic here
//     };

//     return (
        
//         <div className="container p-5 mt-5">
//             <div className="row justify-content-center">
//             <div className="col-md-3">
//                     <div className="card shadow p-3">
//                         <h4 className="text-center mb-4">Profile Overview</h4>
//                         {/* Display profile overview here */}
//                     </div>
//                     <div className="card shadow p-3 mt-4">
//                         <h4 className="text-center mb-4">Change Password</h4>
//                         {/* Display change password form here */}
//                     </div>
//                 </div>
//                 <div className="col-md-6">
//                     <form onSubmit={handleSubmit}>
//                         <div className="card shadow p-5">
//                             <h2 className="text-center mb-4">User Profile</h2>
//                             <div className="mb-3">
//                                 <label className="form-label">Name:</label>
//                                 <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
//                             </div>
//                             {/* Add other input fields */}
//                             <div className="mb-3">
//                                 <label className="form-label">Gender:</label>
//                                 <div className="form-check">
//                                     <input className="form-check-input" type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
//                                     <label className="form-check-label">Male</label>
//                                 </div>
//                                 {/* Add other radio buttons */}
//                             </div>
//                             {/* Add other input fields */}
//                             <div className="text-center">
//                                 <button type="submit" className="btn btn-primary me-2">Save</button>
//                                 <button type="button" className="btn btn-secondary">Cancel</button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//                 {/* Add side column */}
              
//             </div>
//         </div>
//     );
// }

// export default UserProfile;

