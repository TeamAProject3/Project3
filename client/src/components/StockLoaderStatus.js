import React from 'react'

const StocksLoaderStatus = props => {
  if(props.connectionError) {
    return (
      <div className='is-medium'>
        <span className='has-text-danger' >Server sent no data. The market is probably closed at the moment. </span>
        <br />(Try Again Later)
      </div>
    );
  } else {
    return (
      <div className='tag is-large is-success'>
        <span className='loader'> &nbsp;</span>
        &nbsp; &nbsp; Fetching some stocks...
      </div>
    );
  }
}

export default StocksLoaderStatus;