import React from "react";
import { withRouter } from 'react-router-dom';

function Home() {
  return (
    <div className="mt-d d-flex justify-content-center">
      <h3>This is the home page!</h3>
    </div>
  );
}


export default withRouter(Home);