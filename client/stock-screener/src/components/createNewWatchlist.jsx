import React, { useState } from 'react';

function CreateNewWatchlist() {
    const [watchlistName, setWatchlistName] = useState('');
    const [companyName, setCompanyName] = useState('');

    const addToWatchlist = () => {
        if (watchlistName.trim() === '' || companyName.trim() === '') {
            return;
        }
        const newItem = {
            watchlistName: watchlistName,
            companyName: companyName
        };

        setWatchlistName('');
        setCompanyName('');
    };

    const handleCancel = () => {
        setWatchlistName('');
        setCompanyName('');
    };

    return (
        <div className="container p-5 mt-5 col-md-5">
            <div className="col"></div>
            <div className="col">
                <div className="card shadow text-dark p-5">
                    <h2 className="text-center">Add Watchlist</h2>
                    <div className="mb-3">
                        <label htmlFor="watchlistName" className="form-label">
                            Watchlist Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="watchlistName"
                            value={watchlistName}
                            onChange={(e) => setWatchlistName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">
                            Company Name
                        </label>
                        <input
                            type="search"
                            placeholder="Search for a company" 
                            className="form-control"
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button onClick={addToWatchlist} className="btn btn-primary me-2">Save</button>
                        <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
            <div className="col"></div>
        </div>
    );
}

export default CreateNewWatchlist;
