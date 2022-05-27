import React, {useEffect} from 'react';
import { useSelector , useDispatch } from 'react-redux';

const SplashPage = () => {
   const sessionUser = useSelector((state) =>state.session.user)

   return (
      <div>
         <h1>Helloo this is a test </h1>
      </div>
   )
}
 export default SplashPage


