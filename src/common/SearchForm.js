import React, { useState } from "react";
import "./SearchForm.css";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }) {
    console.debug("SearchForm",
        "searchFor=", typeof searchFor
    );

    const [searchTerm, setSearchTerm] = useState("");

    /** Tell parent to filter */
    function handleSubmit(evt) {
      // handle case of accidentally trying to search for just spaces
      evt.preventDefault();

      searchFor(searchTerm.trim() || undefined);
      setSearchTerm(evt.target.value);
    }

    /** Update form fields */
    function handleChange(evt) {
      setSearchTerm(evt.target.value);
  }

    return (
      <div className="SearchForm mb-5 mt-4">
        <form className="form-inline" onSubmit={handleSubmit}>
          <input 
            className="form-control form-control-lg flex-grow-1"
            name="searchTerm"
            placeholder="Enter search term..."
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-lg btn-primary ml-2">
            Submit
          </button>
        </form>
      </div>
    );
}

export default SearchForm;