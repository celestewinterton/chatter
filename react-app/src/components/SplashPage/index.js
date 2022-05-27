import React, {useEffect} from 'react';
import { useSelector , useDispatch } from 'react-redux';

const SplashPage = () => {
   const sessionUser = useSelector((state) =>state.session.user)
}