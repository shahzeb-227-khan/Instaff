import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import JobCard from '../components/JobCard';
import { jobsData } from '../data/jobs';
import { ChevronDown } from 'lucide-react';
import './FindWork.css';

const FindWork = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filters, setFilters] = useState({
    employmentType: [],
    experienceLevel: [],
    salaryRange: [0, 200000],
  });
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const filteredJobs = useMemo(() => {
    let results = [...jobsData];

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword) ||
          job.tags.some((tag) => tag.toLowerCase().includes(keyword))
      );
    }

    if (searchLocation.trim()) {
      const location = searchLocation.toLowerCase();
      results = results.filter(
        (job) =>
          job.remote ||
          job.location.toLowerCase().includes(location) ||
          location.includes('remote')
      );
    }

    if (filters.employmentType.length > 0) {
      results = results.filter((job) => filters.employmentType.includes(job.type));
    }

    if (filters.experienceLevel.length > 0) {
      results = results.filter((job) =>
        filters.experienceLevel.includes(job.experienceLevel)
      );
    }

    results = results.filter(
      (job) =>
        job.salary.min <= filters.salaryRange[1] &&
        job.salary.max >= filters.salaryRange[0]
    );

    if (sortBy === 'salary-high') {
      results.sort((a, b) => b.salary.max - a.salary.max);
    } else if (sortBy === 'salary-low') {
      results.sort((a, b) => a.salary.min - b.salary.min);
    }

    return results;
  }, [searchKeyword, searchLocation, filters, sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage) || 1;
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (keyword, location) => {
    setSearchKeyword(keyword);
    setSearchLocation(location);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchKeyword('');
    setSearchLocation('');
    setFilters({
      employmentType: [],
      experienceLevel: [],
      salaryRange: [0, 200000],
    });
    setSortBy('recent');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetail = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="find-work-page">
      <Navbar />

      <main className="main-content">
        <section className="search-section">
          <div className="container">
            <h1 className="search-title">Find Your Next Opportunity</h1>
            <SearchBar onSearch={handleSearch} />

            <div className="search-meta">
              <span className="opportunities-count">
                Showing {filteredJobs.length} active{' '}
                {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'}
              </span>

              <div className="sort-container">
                <label htmlFor="sort-select">Sort by:</label>
                <div className="sort-wrapper">
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="salary-high">Salary: High to Low</option>
                    <option value="salary-low">Salary: Low to High</option>
                  </select>
                  <ChevronDown size={16} className="sort-icon" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="container content-layout">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              onClearAll={handleClearFilters}
            />

            <div className="job-listings-container">
              {paginatedJobs.length > 0 ? (
                <>
                  <div className="job-cards-grid">
                    {paginatedJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onViewDetail={handleViewDetail}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="pagination">
                      <button
                        className="pagination-btn prev-btn"
                        onClick={() =>
                          currentPage > 1 && handlePageChange(currentPage - 1)
                        }
                        disabled={currentPage === 1}
                      >
                        
                        
                        
                        ← Previous
                      </button>

                      <div className="page-numbers">
                        {pageNumbers.map((page) => (
                          <button
                            key={page}
                            className={`page-btn ${
                              page === currentPage ? 'active' : ''
                            }`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        className="pagination-btn next-btn"
                        onClick={() =>
                          currentPage < totalPages &&
                          handlePageChange(currentPage + 1)
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-results">
                  <h3>No jobs found</h3>
                  <p>
                    Try adjusting your search criteria or clearing filters to
                    see more results.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FindWork;
