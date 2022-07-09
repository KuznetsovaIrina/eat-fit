import React from 'react';
import { connect } from 'react-redux';

const Menu = ({ userData }) => {
    // console.log(userData);

    return (
        <div>Menu</div>
    )
}

const mapStateToProps = (state) => ({
    userData: state.calculator.data,
});

export default connect(mapStateToProps, {})(Menu);