import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import axios from 'axios';

export const Home = () => {

    return (
        <div style={{textAlign:'center', marginBottom:'auto'}}>
            <h1 >Developers find your new position here!</h1>
            <p>Looking for new applicants? Companies sign up today!</p>
        </div>
    );
} 