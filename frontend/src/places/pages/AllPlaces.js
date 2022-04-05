import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './AllPlaces.css';
import PlaceItem from '../components/PlaceItem';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import PropTypes from 'prop-types';

Items.propTypes = {
    currentItems: PropTypes.array
}

AllPlaces.propTypes = {
    itemsPerPage: PropTypes.number
}

function Items({ currentItems }) {
    return (
        <div className="items">
            {currentItems && currentItems.map((place) => (
                <div key={place.id}>
                    <PlaceItem
                        id={place.id}
                        image={place.image}
                        title={place.title}
                        description={place.description}
                        address={place.address}
                        creatorId={place.creator}
                        coordinates={place.location}
                    />
                </div>
            ))}
        </div>
    );
}

function AllPlaces({ itemsPerPage }) {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {

        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places`
                );
                return responseData.places;
            } catch (err) { }
        };
        fetchPlaces().then(response => {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(response.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(response.length / itemsPerPage));
        });
    }, [sendRequest, itemOffset]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {

        const newOffset = event.selected * itemsPerPage % items.length;
        setItemOffset(newOffset);

        let newPageCount = Math.ceil(currentItems.length / itemsPerPage);
        if (pageCount != newPageCount)
            setPageCount(pageCount);
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedUsers && <Items currentItems={currentItems} />}
            
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default AllPlaces;